from django.test import TestCase

from .models import Shipment, ShipmentStatus


class ShipmentTrackingNumberTests(TestCase):
    def build_shipment(self, **overrides):
        defaults = {
            'sender_name': 'Alice Example',
            'recipient_name': 'Bob Example',
            'sender_address': '123 Sender St',
            'recipient_address': '456 Recipient Ave',
            'origin': 'New York',
            'destination': 'Los Angeles',
            'current_location': 'Chicago',
            'package_weight': '2.50',
            'package_dimensions': '12 x 8 x 6',
            'estimated_delivery_date': '2026-08-01',
        }
        defaults.update(overrides)
        return Shipment(**defaults)

    def test_generate_tracking_number_returns_unique_14_digit_value(self):
        tracking_number = Shipment.generate_tracking_number()

        self.assertRegex(tracking_number, r'^\d{14}$')
        self.assertFalse(Shipment.objects.filter(tracking_number=tracking_number).exists())

    def test_saving_shipment_without_tracking_number_populates_it(self):
        shipment = self.build_shipment()

        shipment.save()

        self.assertRegex(shipment.tracking_number, r'^\d{14}$')
        self.assertTrue(Shipment.objects.filter(pk=shipment.pk).exists())

    def test_saving_shipment_with_tracking_number_sets_status_to_in_transit(self):
        shipment = self.build_shipment(tracking_number='12345678901234', status=ShipmentStatus.LABEL_CREATED)

        shipment.save()

        self.assertEqual(shipment.status, ShipmentStatus.IN_TRANSIT)

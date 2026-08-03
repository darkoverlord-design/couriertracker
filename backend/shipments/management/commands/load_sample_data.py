from django.core.management.base import BaseCommand
from django.utils import timezone

from shipments.models import ServiceType, Shipment, ShipmentStatus
from tracking.models import TrackingEvent


class Command(BaseCommand):
    help = 'Load sample shipment data for demonstration'

    def handle(self, *args, **options):
        now = timezone.now()
        default_shipment_time = timezone.make_aware(timezone.datetime(2026, 8, 3, 12), timezone.get_current_timezone())
        default_delivery_date = timezone.datetime(2026, 8, 10).date()

        if Shipment.objects.filter(tracking_number='78459361820571').exists():
            shipment = Shipment.objects.get(tracking_number='78459361820571')
            shipment.sender_name = 'Zhou Kai (周凯)'
            shipment.sender_address = 'Room 1205, Building 3, 188 Century Avenue, Pudong New Area, Shanghai 200120, China'
            shipment.recipient_name = 'Brittney Champagne'
            shipment.recipient_address = '857 Bouie Road, Carriere, Mississippi 39426, USA'
            shipment.origin = 'Shanghai, China'
            shipment.destination = 'Carriere, MS, USA'
            shipment.current_location = 'Shanghai, China'
            shipment.status = ShipmentStatus.IN_TRANSIT
            shipment.service_type = ServiceType.EXPRESS
            shipment.package_weight = 15.6
            shipment.package_dimensions = '55 x 40 x 30'
            shipment.package_contents = '14-inch laptop\n27-inch external monitor\nUPS (battery backup)\niPhone 17 Pro Max\niPad\nPower adapters and charging cables\nWireless keyboard and mouse\nEssential peripherals and protective packaging'
            shipment.progress_percentage = 65
            shipment.origin_lat = 31.2304
            shipment.origin_lng = 121.4737
            shipment.current_lat = 31.2304
            shipment.current_lng = 121.4737
            shipment.destination_lat = 31.1745
            shipment.destination_lng = -89.6537
            shipment.estimated_delivery_date = default_delivery_date
            shipment.save()
            TrackingEvent.objects.filter(shipment=shipment).delete()
            TrackingEvent.objects.create(
                shipment=shipment,
                status=ShipmentStatus.LABEL_CREATED,
                location='Shanghai, China',
                description='Shipping label created.',
                event_timestamp=default_shipment_time - timezone.timedelta(hours=4),
            )
            TrackingEvent.objects.create(
                shipment=shipment,
                status=ShipmentStatus.PICKED_UP,
                location='Shanghai, China',
                description='Package picked up from sender.',
                event_timestamp=default_shipment_time - timezone.timedelta(hours=2),
            )
            TrackingEvent.objects.create(
                shipment=shipment,
                status=ShipmentStatus.IN_TRANSIT,
                location='Shanghai, China',
                description='Departed origin facility.',
                event_timestamp=default_shipment_time,
            )
            TrackingEvent.objects.create(
                shipment=shipment,
                status=ShipmentStatus.IN_TRANSIT,
                location='Fresno, CA Distribution Center',
                description='Arrived at regional hub.',
                event_timestamp=default_shipment_time + timezone.timedelta(hours=6),
            )
            self.stdout.write(self.style.SUCCESS('Updated existing shipment for tracking number 78459361820571.'))
            return

        shipments_data = [
            {
                'tracking_number': '78459361820571',
                'sender_name': 'Acme Corporation',
                'recipient_name': 'Jane Smith',
                'sender_address': '100 Industrial Blvd, Los Angeles, CA 90001',
                'recipient_address': '450 Market Street, San Francisco, CA 94102',
                'origin': 'Los Angeles, CA',
                'destination': 'San Francisco, CA',
                'current_location': 'Fresno, CA Distribution Center',
                'status': ShipmentStatus.IN_TRANSIT,
                'service_type': ServiceType.EXPRESS,
                'package_weight': 15.6,
                'package_dimensions': '18 x 12 x 8',
                'progress_percentage': 65,
                'origin_lat': 34.0522,
                'origin_lng': -118.2437,
                'current_lat': 36.7378,
                'current_lng': -119.7871,
                'destination_lat': 37.7749,
                'destination_lng': -122.4194,
                'package_contents': '14-inch laptop\n27-inch external monitor\nUPS (battery backup)\niPhone 17 Pro Max\niPad\nPower adapters and charging cables\nWireless keyboard and mouse\nEssential peripherals and protective packaging',
                'estimated_delivery_date': default_delivery_date,
                'events': [
                    (ShipmentStatus.LABEL_CREATED, 'Los Angeles, CA', 'Shipping label created.', 96),
                    (ShipmentStatus.PICKED_UP, 'Los Angeles, CA', 'Package picked up from sender.', 72),
                    (ShipmentStatus.IN_TRANSIT, 'Bakersfield, CA', 'Departed origin facility.', 48),
                    (ShipmentStatus.IN_TRANSIT, 'Fresno, CA Distribution Center', 'Arrived at regional hub.', 6),
                ],
            },
            {
                'tracking_number': '98765432109876',
                'sender_name': 'Global Tech Inc.',
                'recipient_name': 'Michael Johnson',
                'sender_address': '500 Tech Park, Austin, TX 78701',
                'recipient_address': '200 Broadway, New York, NY 10007',
                'origin': 'Austin, TX',
                'destination': 'New York, NY',
                'current_location': 'Delivered - New York, NY',
                'status': ShipmentStatus.DELIVERED,
                'service_type': ServiceType.OVERNIGHT,
                'package_weight': 5.2,
                'package_dimensions': '14 x 10 x 6',
                'progress_percentage': 100,
                'origin_lat': 30.2672,
                'origin_lng': -97.7431,
                'current_lat': 40.7128,
                'current_lng': -74.0060,
                'destination_lat': 40.7128,
                'destination_lng': -74.0060,
                'events': [
                    (ShipmentStatus.LABEL_CREATED, 'Austin, TX', 'Shipping label created.', 72),
                    (ShipmentStatus.PICKED_UP, 'Austin, TX', 'Package picked up.', 60),
                    (ShipmentStatus.IN_TRANSIT, 'Memphis, TN Hub', 'In transit to destination.', 36),
                    (ShipmentStatus.OUT_FOR_DELIVERY, 'New York, NY', 'Out for delivery.', 4),
                    (ShipmentStatus.DELIVERED, 'New York, NY', 'Delivered to recipient.', 1),
                ],
            },
            {
                'tracking_number': '55556666777788',
                'sender_name': 'Pacific Imports',
                'recipient_name': 'Sarah Williams',
                'sender_address': '88 Harbor Drive, Seattle, WA 98101',
                'recipient_address': '1200 Ocean Ave, Miami, FL 33139',
                'origin': 'Seattle, WA',
                'destination': 'Miami, FL',
                'current_location': 'Denver, CO Sorting Facility',
                'status': ShipmentStatus.IN_TRANSIT,
                'service_type': ServiceType.STANDARD,
                'package_weight': 22.0,
                'package_dimensions': '24 x 18 x 12',
                'progress_percentage': 45,
                'origin_lat': 47.6062,
                'origin_lng': -122.3321,
                'current_lat': 39.7392,
                'current_lng': -104.9903,
                'destination_lat': 25.7617,
                'destination_lng': -80.1918,
                'events': [
                    (ShipmentStatus.LABEL_CREATED, 'Seattle, WA', 'Shipping label created.', 120),
                    (ShipmentStatus.PICKED_UP, 'Seattle, WA', 'Package picked up.', 108),
                    (ShipmentStatus.IN_TRANSIT, 'Portland, OR', 'Departed origin facility.', 84),
                    (ShipmentStatus.IN_TRANSIT, 'Denver, CO Sorting Facility', 'Arrived at sorting facility.', 24),
                ],
            },
        ]

        for data in shipments_data:
            events = data.pop('events')
            shipment = Shipment.objects.create(
                **data,
            )
            for status, location, description, hours_ago in events:
                TrackingEvent.objects.create(
                    shipment=shipment,
                    status=status,
                    location=location,
                    description=description,
                    event_timestamp=now - timezone.timedelta(hours=hours_ago),
                )

        self.stdout.write(self.style.SUCCESS('Successfully loaded 3 sample shipments.'))
        self.stdout.write('Try tracking: 78459361820571')

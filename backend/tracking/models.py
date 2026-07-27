from django.db import models

from shipments.models import Shipment, ShipmentStatus


class TrackingEvent(models.Model):
    shipment = models.ForeignKey(
        Shipment,
        on_delete=models.CASCADE,
        related_name='events',
    )
    status = models.CharField(max_length=32, choices=ShipmentStatus.choices)
    location = models.CharField(max_length=255)
    description = models.TextField()
    event_timestamp = models.DateTimeField()

    class Meta:
        ordering = ['-event_timestamp']
        indexes = [
            models.Index(fields=['shipment', '-event_timestamp']),
        ]

    def __str__(self):
        return f'{self.shipment.tracking_number} - {self.get_status_display()} @ {self.location}'

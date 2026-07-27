import re
import secrets

from django.core.exceptions import ValidationError
from django.db import models


def validate_tracking_number(value):
    if not re.fullmatch(r'\d{14}', value):
        raise ValidationError('Tracking number must be exactly 14 numeric digits.')


class ShipmentStatus(models.TextChoices):
    LABEL_CREATED = 'label_created', 'Label Created'
    PICKED_UP = 'picked_up', 'Picked Up'
    IN_TRANSIT = 'in_transit', 'In Transit'
    OUT_FOR_DELIVERY = 'out_for_delivery', 'Out for Delivery'
    DELIVERED = 'delivered', 'Delivered'
    EXCEPTION = 'exception', 'Exception'
    RETURNED = 'returned', 'Returned'


class ServiceType(models.TextChoices):
    STANDARD = 'standard', 'Standard'
    EXPRESS = 'express', 'Express'
    OVERNIGHT = 'overnight', 'Overnight'
    INTERNATIONAL = 'international', 'International'
    FREIGHT = 'freight', 'Freight'


class Shipment(models.Model):
    tracking_number = models.CharField(
        max_length=14,
        unique=True,
        db_index=True,
        blank=True,
        validators=[validate_tracking_number],
    )
    sender_name = models.CharField(max_length=255)
    recipient_name = models.CharField(max_length=255)
    sender_address = models.TextField()
    recipient_address = models.TextField()
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    current_location = models.CharField(max_length=255)
    status = models.CharField(
        max_length=32,
        choices=ShipmentStatus.choices,
        default=ShipmentStatus.LABEL_CREATED,
        db_index=True,
    )
    service_type = models.CharField(
        max_length=32,
        choices=ServiceType.choices,
        default=ServiceType.STANDARD,
    )
    carrier = models.CharField(max_length=100, default='CourierTrack')
    package_weight = models.DecimalField(max_digits=8, decimal_places=2, help_text='Weight in lbs')
    package_dimensions = models.CharField(max_length=100, help_text='L x W x H in inches')
    package_contents = models.TextField(blank=True, help_text='Shipment contents or items in the package')
    estimated_delivery_date = models.DateField()
    progress_percentage = models.PositiveSmallIntegerField(default=0)
    origin_lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    origin_lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    current_lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    current_lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    destination_lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    destination_lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['tracking_number']),
            models.Index(fields=['status', '-created_at']),
        ]

    def __str__(self):
        return f'{self.tracking_number} - {self.get_status_display()}'

    @classmethod
    def generate_tracking_number(cls):
        while True:
            value = f'{secrets.randbelow(10**14):014d}'
            if not cls.objects.filter(tracking_number=value).exists():
                return value

    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = self.generate_tracking_number()

        if self.tracking_number and self.status == ShipmentStatus.LABEL_CREATED:
            self.status = ShipmentStatus.IN_TRANSIT

        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        if self.progress_percentage > 100:
            raise ValidationError({'progress_percentage': 'Progress cannot exceed 100%.'})

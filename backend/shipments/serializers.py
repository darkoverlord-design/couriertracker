import re

from rest_framework import serializers

from .models import Shipment


class ShipmentSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    service_type_display = serializers.CharField(source='get_service_type_display', read_only=True)

    class Meta:
        model = Shipment
        fields = [
            'id',
            'tracking_number',
            'sender_name',
            'recipient_name',
            'sender_address',
            'recipient_address',
            'origin',
            'destination',
            'current_location',
            'status',
            'status_display',
            'service_type',
            'service_type_display',
            'carrier',
            'package_weight',
            'package_dimensions',
            'package_contents',
            'estimated_delivery_date',
            'progress_percentage',
            'origin_lat',
            'origin_lng',
            'current_lat',
            'current_lng',
            'destination_lat',
            'destination_lng',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def validate_tracking_number(self, value):
        if not re.fullmatch(r'\d{14}', value):
            raise serializers.ValidationError('Tracking number must be exactly 14 numeric digits.')
        return value

    def validate_progress_percentage(self, value):
        if value > 100:
            raise serializers.ValidationError('Progress cannot exceed 100%.')
        return value

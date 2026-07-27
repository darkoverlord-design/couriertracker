from rest_framework import serializers

from .models import TrackingEvent


class TrackingEventSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = TrackingEvent
        fields = [
            'id',
            'shipment',
            'status',
            'status_display',
            'location',
            'description',
            'event_timestamp',
        ]

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .models import TrackingEvent
from .serializers import TrackingEventSerializer


class TrackingEventViewSet(viewsets.ModelViewSet):
    queryset = TrackingEvent.objects.select_related('shipment').all()
    serializer_class = TrackingEventSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ['status', 'shipment']
    search_fields = ['location', 'description', 'shipment__tracking_number']
    ordering_fields = ['event_timestamp']

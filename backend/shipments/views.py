import logging
import re

from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from tracking.serializers import TrackingEventSerializer

from .models import Shipment
from .serializers import ShipmentSerializer

logger = logging.getLogger(__name__)


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ['status', 'service_type', 'carrier']
    search_fields = ['tracking_number', 'sender_name', 'recipient_name']
    ordering_fields = ['created_at', 'updated_at', 'estimated_delivery_date']

    def get_permissions(self):
        if self.action == 'retrieve':
            return [AllowAny()]
        return [IsAdminUser()]


class PublicTrackView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, tracking_number):
        if not re.fullmatch(r'\d{14}', tracking_number):
            return Response(
                {'detail': 'Tracking number must be exactly 14 numeric digits.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        shipment = get_object_or_404(Shipment, tracking_number=tracking_number)
        events = shipment.events.all().order_by('-event_timestamp')
        logger.info('Tracking lookup: %s', tracking_number)

        return Response({
            'shipment': ShipmentSerializer(shipment).data,
            'tracking_history': TrackingEventSerializer(events, many=True).data,
        })

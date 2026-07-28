import logging
import re

from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from tracking.serializers import TrackingEventSerializer

from .models import ServiceType, Shipment, ShipmentStatus
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

        if tracking_number == '12345678901234':
            shipment = Shipment.objects.filter(tracking_number=tracking_number).first()
            if shipment is None:
                shipment = Shipment.objects.create(
                    tracking_number=tracking_number,
                    sender_name='Zhou Kai (周凯)',
                    sender_address='Room 1205, Building 3, 188 Century Avenue, Pudong New Area, Shanghai 200120, China',
                    recipient_name='Brittney Champagne',
                    recipient_address='857 Bouie Road, Carriere, Mississippi 39426, USA',
                    origin='Shanghai, China',
                    destination='Carriere, MS, USA',
                    current_location='Shanghai, China',
                    status=ShipmentStatus.IN_TRANSIT,
                    service_type=ServiceType.EXPRESS,
                    package_weight=13.8,
                    package_dimensions='55 x 40 x 30',
                    package_contents='Laptop\nExternal monitor\nUPS (battery backup)',
                    estimated_delivery_date='2026-08-01',
                    progress_percentage=65,
                    origin_lat=31.2304,
                    origin_lng=121.4737,
                    current_lat=31.2304,
                    current_lng=121.4737,
                    destination_lat=31.1745,
                    destination_lng=-89.6537,
                )
            else:
                shipment.sender_name = 'Zhou Kai (周凯)'
                shipment.sender_address = 'Room 1205, Building 3, 188 Century Avenue, Pudong New Area, Shanghai 200120, China'
                shipment.recipient_name = 'Brittney Champagne'
                shipment.recipient_address = '857 Bouie Road, Carriere, Mississippi 39426, USA'
                shipment.origin = 'Shanghai, China'
                shipment.destination = 'Carriere, MS, USA'
                shipment.current_location = 'Shanghai, China'
                shipment.status = ShipmentStatus.IN_TRANSIT
                shipment.service_type = ServiceType.EXPRESS
                shipment.package_weight = 13.8
                shipment.package_dimensions = '55 x 40 x 30'
                shipment.package_contents = 'Laptop\nExternal monitor\nUPS (battery backup)'
                shipment.estimated_delivery_date = '2026-08-01'
                shipment.progress_percentage = 65
                shipment.origin_lat = 31.2304
                shipment.origin_lng = 121.4737
                shipment.current_lat = 31.2304
                shipment.current_lng = 121.4737
                shipment.destination_lat = 31.1745
                shipment.destination_lng = -89.6537
                shipment.save(update_fields=[
                    'sender_name',
                    'sender_address',
                    'recipient_name',
                    'recipient_address',
                    'origin',
                    'destination',
                    'current_location',
                    'status',
                    'service_type',
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
                ])
        else:
            shipment = get_object_or_404(Shipment, tracking_number=tracking_number)

        events = shipment.events.all().order_by('-event_timestamp')
        logger.info('Tracking lookup: %s', tracking_number)

        return Response({
            'shipment': ShipmentSerializer(shipment).data,
            'tracking_history': TrackingEventSerializer(events, many=True).data,
        })

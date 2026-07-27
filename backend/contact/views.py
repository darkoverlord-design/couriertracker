from rest_framework import mixins, status, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import ContactMessage
from .serializers import ContactMessageCreateSerializer, ContactMessageSerializer


class ContactMessageViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    filterset_fields = ['is_read']
    search_fields = ['name', 'email', 'subject']
    ordering_fields = ['created_at']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    def get_serializer_class(self):
        if self.action == 'create':
            return ContactMessageCreateSerializer
        return ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'detail': 'Thank you for contacting us. We will respond shortly.'},
            status=status.HTTP_201_CREATED,
        )

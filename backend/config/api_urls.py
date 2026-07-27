from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from contact.views import ContactMessageViewSet
from shipments.views import ShipmentViewSet, PublicTrackView
from tracking.views import TrackingEventViewSet

router = DefaultRouter()
router.register(r'shipments', ShipmentViewSet, basename='shipment')
router.register(r'tracking-events', TrackingEventViewSet, basename='tracking-event')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('track/<str:tracking_number>/', PublicTrackView.as_view(), name='public-track'),
    path('', include(router.urls)),
]

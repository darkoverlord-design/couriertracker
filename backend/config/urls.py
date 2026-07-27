import os

from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import RedirectView

FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://127.0.0.1:5173/')

urlpatterns = [
    path('', RedirectView.as_view(url=FRONTEND_URL, permanent=False), name='home'),
    path('admin/', admin.site.urls),
    path('api/v1/', include('config.api_urls')),
]

admin.site.site_header = 'CourierTrack Administration'
admin.site.site_title = 'CourierTrack Admin'
admin.site.index_title = 'Shipment Management'
admin.site.site_url = FRONTEND_URL

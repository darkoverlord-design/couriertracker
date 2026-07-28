import os
from pathlib import Path

from django.conf import settings
from django.contrib import admin
from django.http import FileResponse
from django.urls import include, path, re_path

FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://couriertracker.vercel.app/')


def serve_frontend(request, path=''):
    if request.path.startswith('/api/') or request.path.startswith('/admin/'):
        return FileResponse(Path(settings.STATIC_ROOT, 'index.html').open('rb'), content_type='text/html; charset=utf-8')

    index_path = Path(settings.STATIC_ROOT) / 'index.html'
    if not index_path.exists():
        index_path = Path(settings.BASE_DIR) / 'staticfiles' / 'index.html'

    if index_path.exists():
        return FileResponse(index_path.open('rb'), content_type='text/html; charset=utf-8')

    return FileResponse(Path(settings.BASE_DIR, 'templates', 'index.html').open('rb'), content_type='text/html; charset=utf-8')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('config.api_urls')),
    path('', serve_frontend, name='home'),
    re_path(r'^(?!api/|admin/|static/|assets/|favicon\.svg|.*\.(?:js|css|png|jpg|jpeg|svg|ico|webp|json|map)$).+', serve_frontend),
]

admin.site.site_header = 'CourierTrack Administration'
admin.site.site_title = 'CourierTrack Admin'
admin.site.index_title = 'Shipment Management'
admin.site.site_url = FRONTEND_URL

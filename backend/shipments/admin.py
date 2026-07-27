from django.contrib import admin
from django.contrib import messages

from .models import Shipment


def generate_tracking_numbers(modeladmin, request, queryset):
    generated = 0
    for shipment in queryset:
        if not shipment.tracking_number:
            shipment.tracking_number = Shipment.generate_tracking_number()
            shipment.save(update_fields=['tracking_number'])
            generated += 1

    modeladmin.message_user(
        request,
        f'Generated {generated} tracking number(s).',
        level=messages.SUCCESS,
    )


generate_tracking_numbers.short_description = 'Generate tracking numbers'


class TrackingEventInline(admin.TabularInline):
    from tracking.models import TrackingEvent

    model = TrackingEvent
    extra = 1
    ordering = ['-event_timestamp']


@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = (
        'tracking_number',
        'recipient_name',
        'status',
        'origin',
        'destination',
        'estimated_delivery_date',
        'updated_at',
    )
    list_filter = ('status', 'service_type', 'carrier')
    search_fields = ('tracking_number', 'sender_name', 'recipient_name', 'origin', 'destination')
    readonly_fields = ('tracking_number', 'created_at', 'updated_at')
    inlines = [TrackingEventInline]
    actions = [generate_tracking_numbers]
    fieldsets = (
        ('Shipment Details', {
            'fields': ('tracking_number', 'status', 'service_type', 'carrier', 'progress_percentage'),
        }),
        ('Customer Details', {
            'fields': ('sender_name', 'sender_address', 'recipient_name', 'recipient_address'),
        }),
        ('Route', {
            'fields': ('origin', 'destination', 'current_location'),
        }),
        ('Package', {
            'fields': ('package_weight', 'package_dimensions', 'package_contents', 'estimated_delivery_date'),
        }),
        ('Optional Map Coordinates', {
            'classes': ('collapse',),
            'fields': ('origin_lat', 'origin_lng', 'current_lat', 'current_lng', 'destination_lat', 'destination_lng'),
        }),
    )

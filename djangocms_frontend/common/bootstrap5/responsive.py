from django import forms
from django.utils.translation import gettext_lazy as _
from entangled.forms import EntangledModelFormMixin

from djangocms_frontend import settings
from djangocms_frontend.fields import IconMultiselect
from djangocms_frontend.helpers import insert_fields
from djangocms_frontend.settings import DEVICE_CHOICES

visibility_class = {
    "GridRow": "flex",
}


def get_display_classes(visibility_set, visibility_class="block"):
    """Generates the necessary bootstrap display utility classes for a set
    of devices on which the content should be seen/hidden"""
    classes = []
    visible = True
    for device, __ in DEVICE_CHOICES:
        if (device in visibility_set) != visible:
            visible = device in visibility_set
            if device == "xs":
                classes.append(f"d-{visibility_class if visible else 'none'}")
            else:
                classes.append(f"d-{device}-{visibility_class if visible else 'none'}")
    return classes


class ResponsiveMixin:
    blockattrs = {
        #     "description": _(
        #         "Use the responsive tools to tailor your content to the device "
        #         "the user is using."
        #     )
    }

    def render(self, context, instance, placeholder):
        if instance.config.get("responsive_visibility", None) is not None:
            instance.add_classes(
                get_display_classes(
                    instance.responsive_visibility,
                    visibility_class.get(instance.ui_item, "block"),
                )
            )
        return super().render(context, instance, placeholder)

    def get_fieldsets(self, request, obj=None):
        return insert_fields(
            super().get_fieldsets(request, obj),
            ("responsive_visibility",),
            block=None,
            position=-1,
            blockname=_("Visibility"),
            blockattrs=self.blockattrs,
        )


class ResponsiveFormMixin(EntangledModelFormMixin):
    class Meta:
        entangled_fields = {
            "config": [
                "responsive_visibility",
            ]
        }

    responsive_visibility = forms.MultipleChoiceField(
        label=_("Show element on device"),
        required=False,
        choices=settings.DEVICE_CHOICES,
        initial=[value for value, _ in settings.DEVICE_CHOICES],
        help_text=_("Select only devices on which this element should be shown."),
        widget=IconMultiselect(),
    )
from django import forms
from .models import Application

class ApplicationForm(forms.ModelForm):

    class Meta:
        model = Application
        fields = [
            'unit',
            'name',
            'rank',
            'reason',
            'agreed_to_terms',
        ]

        widgets = {
            "unit": forms.Select(attrs={
                "class": "select",
            }),

            "name": forms.TextInput(attrs={
                "class": "input",
                "placeholder": "مثال: محمد عبدالله",
                "autocomplete": "off",
            }),

            "rank": forms.Select(attrs={
                "class": "select",
            }),

            "reason": forms.Textarea(attrs={
                "class": "textarea",
                "placeholder": "اكتب سببًا واضحًا يعكس جديّتك، خبرتك، وما الذي يميّزك للانضمام لهذه الوحدة.",
                "rows": 6,
            }),

            "agreed_to_terms": forms.CheckboxInput(attrs={
                "class": "checkbox__input",
            }),
        }
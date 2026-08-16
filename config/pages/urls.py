from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='index' ),
    path('rules', views.rules, name='rules' ),
    path('airunit', views.airunit, name='airunit' ),
    path('motorunit', views.motorunit, name='motorunit' ),
    path('speedunit', views.speedunit, name='speedunit' ),
]
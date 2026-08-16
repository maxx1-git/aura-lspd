from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def rules(request):
    return render(request, 'pages/rules.html')

def airunit(request):
    return render(request, 'pages/unit-air.html')

def motorunit(request):
    return render(request, 'pages/unit-motor.html')

def speedunit(request):
    return render(request, 'pages/unit-speed.html')
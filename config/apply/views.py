from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from . import models
# Create your views here.

@login_required
def apply(request):
    if request.method == "POST":
        form = models.Application(request.POST)

        if form.is_valid():
            application = form.save(commit=False)

            application.user = request.user

            application.save()
            return redirect('apply_success')

    return render(request, 'apply/apply.html')

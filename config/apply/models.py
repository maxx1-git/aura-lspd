from django.db import models
from django.conf import settings
# Create your models here.

class Unit(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name



class Application(models.Model):

    class Rank(models.TextChoices):
        CAPTAIN = "captain", "نقيب"
        FIRST_LIEUTENANT = "first_lieutenant", "ملازم أول"
        LIEUTENANT = "lieutenant", "ملازم"
        NCO_COMMANDER = "nco_commander", "مسؤول الرتباء"
        FIRST_SERGEANT = "first_sergeant", "رقيب أول"
        SERGEANT = "sergeant", "رقيب"
        FIRST_CORPORAL = "first_corporal", "عريف أول"
        CORPORAL = "corporal", "عريف"

    class Status(models.TextChoices):
        PENDING = "pending", "قيد المراجعة"
        ACCEPTED = "accepted", "مقبول"
        REJECTED = "rejected", "مرفوض"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications"
    )
    
    unit = models.ForeignKey(
        Unit,
        on_delete=models.PROTECT,
        related_name="applications"
    )

    name = models.CharField(max_length=100)

    rank = models.CharField(
        max_length=30,
        choices=Rank.choices,
    )

    reason = models.TextField()
    agreed_to_terms = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)


    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.unit.name}"
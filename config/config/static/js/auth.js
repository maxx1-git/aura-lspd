/* AURA CFW — auth.js — UI-only validation for login/register */
(function () {
  "use strict";
  function setError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    if (message) {
      wrap.classList.add("has-error");
      var e = wrap.querySelector(".field__error");
      if (e) e.textContent = message;
    } else wrap.classList.remove("has-error");
  }

  function simulateSubmit(form, successMsg) {
    var btn = form.querySelector("[data-submit]");
    btn.classList.add("is-loading");
    btn.disabled = true;
    setTimeout(function () {
      btn.classList.remove("is-loading");
      btn.disabled = false;
      window.AuraToast &&
        window.AuraToast.show({ kind: "success", title: "تم", message: successMsg });
    }, 1000);
  }

  var login = document.getElementById("login-form");
  if (login) {
    login.addEventListener("submit", function (e) {
      e.preventDefault();
      var id = login.elements["identifier"];
      var pw = login.elements["password"];
      var ok = true;
      if (!id.value.trim()) { setError(id, "أدخل البريد أو اسم المستخدم."); ok = false; } else setError(id);
      if (!pw.value || pw.value.length < 6) { setError(pw, "كلمة المرور ٦ أحرف على الأقل."); ok = false; } else setError(pw);
      if (!ok) {
        window.AuraToast && window.AuraToast.show({ kind: "danger", title: "بيانات غير صحيحة", message: "راجع الحقول المميزة." });
        return;
      }
      simulateSubmit(login, "تم تسجيل الدخول (واجهة فقط).");
    });
  }

  var reg = document.getElementById("register-form");
  if (reg) {
    reg.addEventListener("submit", function (e) {
      e.preventDefault();
      var u = reg.elements["username"];
      var em = reg.elements["email"];
      var pw = reg.elements["password"];
      var cpw = reg.elements["confirm"];
      var du = reg.elements["discord_user"];
      var di = reg.elements["discord_id"];
      var ok = true;
      if (!u.value.trim() || u.value.trim().length < 3) { setError(u, "اسم المستخدم قصير."); ok = false; } else setError(u);
      if (!/^\S+@\S+\.\S+$/.test(em.value)) { setError(em, "بريد إلكتروني غير صالح."); ok = false; } else setError(em);
      if (!pw.value || pw.value.length < 6) { setError(pw, "كلمة المرور ٦ أحرف على الأقل."); ok = false; } else setError(pw);
      if (cpw.value !== pw.value) { setError(cpw, "كلمتا المرور غير متطابقتين."); ok = false; } else setError(cpw);
      if (!du.value.trim()) { setError(du, "أدخل اسم Discord."); ok = false; } else setError(du);
      if (!/^\d{6,}$/.test(di.value.trim())) { setError(di, "معرف Discord أرقام فقط."); ok = false; } else setError(di);
      if (!ok) {
        window.AuraToast && window.AuraToast.show({ kind: "danger", title: "تعذر التسجيل", message: "راجع الحقول." });
        return;
      }
      simulateSubmit(reg, "تم إنشاء الحساب (واجهة فقط).");
    });
  }
})();

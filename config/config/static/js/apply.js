/* AURA CFW — apply.js — form validation UI only */
(function () {
  "use strict";
  var form = document.getElementById("apply-form");
  if (!form) return;

  var btn = form.querySelector('[data-submit]');

  function setError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    if (message) {
      wrap.classList.add("has-error");
      var err = wrap.querySelector(".field__error");
      if (err) err.textContent = message;
    } else {
      wrap.classList.remove("has-error");
    }
  }

  function validate() {
    var ok = true;
    var name = form.elements["name"];
    var dUser = form.elements["discord_user"];
    var dId = form.elements["discord_id"];
    var rank = form.elements["rank"];
    var reason = form.elements["reason"];
    var agree = form.elements["agree"];

    if (!name.value.trim() || name.value.trim().length < 3) {
      setError(name, "الاسم قصير جدًا (٣ أحرف على الأقل).");
      ok = false;
    } else setError(name);

    if (!dUser.value.trim()) {
      setError(dUser, "يرجى إدخال اسم المستخدم على Discord.");
      ok = false;
    } else setError(dUser);

    if (!/^\d{6,}$/.test(dId.value.trim())) {
      setError(dId, "معرف Discord يجب أن يكون أرقامًا (٦ خانات على الأقل).");
      ok = false;
    } else setError(dId);

    if (!rank.value) {
      setError(rank, "اختر الرتبة.");
      ok = false;
    } else setError(rank);

    if (!reason.value.trim() || reason.value.trim().length < 20) {
      setError(reason, "اكتب سببًا واضحًا (٢٠ حرفًا على الأقل).");
      ok = false;
    } else setError(reason);

    if (!agree.checked) {
      var wrap = agree.closest(".field");
      if (wrap) wrap.classList.add("has-error");
      ok = false;
    } else {
      var w = agree.closest(".field");
      if (w) w.classList.remove("has-error");
    }
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      window.AuraToast &&
        window.AuraToast.show({
          kind: "danger",
          title: "تعذر إرسال الطلب",
          message: "يرجى تصحيح الحقول المميزة ثم المحاولة مجددًا.",
        });
      return;
    }
    btn.classList.add("is-loading");
    btn.disabled = true;
    setTimeout(function () {
      btn.classList.remove("is-loading");
      btn.disabled = false;
      form.reset();
      window.AuraToast &&
        window.AuraToast.show({
          kind: "success",
          title: "تم استلام طلبك",
          message: "سيتم مراجعة تقديمك من قِبل المشرف قريبًا.",
        });
    }, 1200);
  });
})();

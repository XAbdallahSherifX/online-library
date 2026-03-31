"use strict";

const loginForm   = document.querySelector(".login-form");
const emailInput  = loginForm.querySelector('input[name="email"]');
const passInput   = loginForm.querySelector('input[name="password"]');
const rememberChk = loginForm.querySelector('input[name="remember_me"]');
const submitBtn   = loginForm.querySelector('button[type="submit"]');
const loginCard   = document.querySelector(".login-card");

(function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes gildora-shake {
      0%   { transform: translateX(0);    }
      15%  { transform: translateX(-7px); }
      30%  { transform: translateX( 7px); }
      45%  { transform: translateX(-5px); }
      60%  { transform: translateX( 5px); }
      75%  { transform: translateX(-3px); }
      90%  { transform: translateX( 3px); }
      100% { transform: translateX(0);    }
    }
    .error-shake {
      animation: gildora-shake 0.45s ease both;
    }

    @keyframes gildora-spin {
      to { transform: rotate(360deg); }
    }
    .btn-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.35);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: gildora-spin 0.7s linear infinite;
      vertical-align: middle;
      margin-right: 8px;
    }

    .field-error {
      border-color: #800020 !important;
      box-shadow:   0 0 0 3px rgba(128, 0, 32, 0.12) !important;
      background:   #fff5f6 !important;
    }
    .field-success {
      border-color: #2e7d32 !important;
      box-shadow:   0 0 0 3px rgba(46, 125, 50, 0.10) !important;
      background:   #f9f9f9 !important;
    }
  `;
  document.head.appendChild(style);
})();

function createErrorSpan(input, id) {
  const span = document.createElement("span");
  span.id = id;
  span.setAttribute("role", "alert");
  span.setAttribute("aria-live", "polite");
  span.style.cssText = `
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: #800020;
    margin-top: 2px;
    margin-bottom: 14px;
    min-height: 1em;
    letter-spacing: 0.02em;
    opacity: 0;
    transition: opacity 0.2s ease;
  `;
  input.insertAdjacentElement("afterend", span);
  return span;
}

const emailError = createErrorSpan(emailInput, "err-login-email");
const passError  = createErrorSpan(passInput.parentElement,  "err-login-pass");

function showError(input, errorEl, message) {
  input.classList.remove("field-success");
  input.classList.add("field-error");
  errorEl.textContent   = "⚠ " + message;
  errorEl.style.opacity = "1";
  triggerShake(input);
}

function showSuccess(input, errorEl) {
  input.classList.remove("field-error");
  input.classList.add("field-success");
  errorEl.textContent   = "";
  errorEl.style.opacity = "0";
}

function clearState(input, errorEl) {
  input.classList.remove("field-error", "field-success");
  errorEl.textContent   = "";
  errorEl.style.opacity = "0";
}

function triggerShake(element) {
  element.classList.remove("error-shake");

  void element.offsetWidth;

  element.classList.add("error-shake");

  element.addEventListener(
    "animationend",
    function () { element.classList.remove("error-shake"); },
    { once: true }
  );
}

function validateEmail() {
  const val     = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (val.length === 0) {
    showError(emailInput, emailError, "Email address is required.");
    return false;
  }
  if (!pattern.test(val)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  }

  showSuccess(emailInput, emailError);
  return true;
}

function validatePassword() {
  const val = passInput.value;

  if (val.length === 0) {
    showError(passInput, passError, "Password is required.");
    return false;
  }
  if (val.length < 8) {
    showError(passInput, passError, "Password must be at least 8 characters.");
    return false;
  }

  showSuccess(passInput, passError);
  return true;
}

function preventSpaces(e) {
  if (e.type === "keydown" && e.key === " ") {
    e.preventDefault();
    return;
  }

  if (e.type === "input") {
    const pos     = e.target.selectionStart;
    const cleaned = e.target.value.replace(/\s/g, "");
    if (cleaned !== e.target.value) {
      e.target.value = cleaned;
      e.target.setSelectionRange(pos - 1, pos - 1);
    }
  }
}

emailInput.addEventListener("keydown", preventSpaces);
emailInput.addEventListener("input",   preventSpaces);


emailInput.addEventListener("blur", validateEmail);
passInput.addEventListener("blur",  validatePassword);

emailInput.addEventListener("input", function () {
  if (this.dataset.touched === "true") validateEmail();
});
passInput.addEventListener("input", function () {
  if (this.dataset.touched === "true") validatePassword();
});

[emailInput, passInput].forEach(function (input) {
  input.addEventListener("blur", function () {
    this.dataset.touched = "true";
  });
});

emailInput.addEventListener("focus", function () {
  if (this.classList.contains("field-error")) clearState(this, emailError);
});
passInput.addEventListener("focus", function () {
  if (this.classList.contains("field-error")) clearState(this, passError);
});


const REMEMBER_KEY   = "gildora_remember_me";
const SAVED_EMAIL_KEY = "gildora_saved_email";

function loadRememberMe() {
  const remembered = localStorage.getItem(REMEMBER_KEY) === "true";
  const savedEmail = localStorage.getItem(SAVED_EMAIL_KEY) || "";

  if (rememberChk) {
    rememberChk.checked = remembered;
  }

  if (remembered && savedEmail) {
    emailInput.value = savedEmail;
  }
}

function saveRememberMe(isChecked, email) {
  if (isChecked) {
    localStorage.setItem(REMEMBER_KEY,    "true");
    localStorage.setItem(SAVED_EMAIL_KEY, email.trim());
  } else {
    localStorage.removeItem(REMEMBER_KEY);
    localStorage.removeItem(SAVED_EMAIL_KEY);
  }
}

loadRememberMe();

function setButtonLoading() {
  submitBtn.disabled            = true;
  submitBtn.style.opacity       = "0.75";
  submitBtn.style.cursor        = "not-allowed";
  submitBtn.style.transform     = "none";
  submitBtn.style.pointerEvents = "none";

  submitBtn.dataset.originalText = submitBtn.textContent.trim();
  submitBtn.innerHTML = '<span class="btn-spinner"></span>Authenticating...';
}

function resetButton() {
  submitBtn.disabled            = false;
  submitBtn.style.opacity       = "1";
  submitBtn.style.cursor        = "pointer";
  submitBtn.style.transform     = "";
  submitBtn.style.pointerEvents = "";
  submitBtn.textContent         = submitBtn.dataset.originalText || "login";
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const isEmailValid = validateEmail();
  const isPassValid  = validatePassword();

  if (!isEmailValid || !isPassValid) {
    triggerShake(loginCard);  
    if (!isEmailValid) emailInput.focus();
    else               passInput.focus();

    return;
  }

  saveRememberMe(
    rememberChk ? rememberChk.checked : false,
    emailInput.value
  );

  setButtonLoading();

  setTimeout(function () {
    window.location.href = loginForm.action || "index.html";
  }, 1600);
});

emailInput.addEventListener("blur", function () {
  this.value = this.value.trim();
});
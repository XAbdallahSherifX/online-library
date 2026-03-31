"use strict";

const form            = document.querySelector("form");
const usernameInput   = form.querySelector('input[name="username"]');
const emailInput      = form.querySelector('input[name="email"]');
const passwordInput   = form.querySelector('input[name="password"]');
const confirmInput    = form.querySelector('input[name="confirm_password"]');
const submitBtn       = form.querySelector('button[type="submit"]');

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
    margin-top: -12px;
    margin-bottom: 10px;
    min-height: 1em;
    letter-spacing: 0.02em;
    transition: opacity 0.2s ease;
    opacity: 0;
  `;
  input.insertAdjacentElement("afterend", span);
  return span;
}

const usernameError = createErrorSpan(usernameInput,  "err-username");
const emailError    = createErrorSpan(emailInput,     "err-email");
const passwordError = createErrorSpan(passwordInput,  "err-password");
const confirmError  = createErrorSpan(confirmInput,   "err-confirm");

function showError(input, errorEl, message) {
  input.style.borderColor  = "#800020";
  input.style.boxShadow    = "0 0 0 3px rgba(128, 0, 32, 0.12)";
  input.style.background   = "#fff5f6";
  errorEl.textContent      = "⚠ " + message;
  errorEl.style.opacity    = "1";
}

function clearError(input, errorEl) {
  input.style.borderColor = "#e0e0e0";
  input.style.boxShadow   = "none";
  input.style.background  = "#f9f9f9";
  errorEl.textContent     = "";
  errorEl.style.opacity   = "0";
}

function showSuccess(input, errorEl) {
  input.style.borderColor = "#2e7d32";
  input.style.boxShadow   = "0 0 0 3px rgba(46, 125, 50, 0.10)";
  input.style.background  = "#f9f9f9";
  errorEl.textContent     = "";
  errorEl.style.opacity   = "0";
}

function validateUsername() {
  const val = usernameInput.value.trim();

  if (val.length === 0) {
    showError(usernameInput, usernameError, "Username is required.");
    return false;
  }
  if (val.length < 3) {
    showError(usernameInput, usernameError, "Username must be at least 3 characters.");
    return false;
  }
  if (/\s/.test(usernameInput.value)) {
    showError(usernameInput, usernameError, "Username cannot contain spaces.");
    return false;
  }

  showSuccess(usernameInput, usernameError);
  return true;
}

function validateEmail() {
  const val = emailInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (val.length === 0) {
    showError(emailInput, emailError, "Email address is required.");
    return false;
  }
  if (!emailPattern.test(val)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  }

  showSuccess(emailInput, emailError);
  return true;
}

function validatePassword() {
  const val = passwordInput.value;

  if (val.length === 0) {
    showError(passwordInput, passwordError, "Password is required.");
    return false;
  }
  if (val.length < 8) {
    showError(passwordInput, passwordError, "Password must be at least 8 characters.");
    return false;
  }

  showSuccess(passwordInput, passwordError);

  if (confirmInput.value.length > 0) {
    validateConfirm();
  }

  return true;
}

function validateConfirm() {
  const val     = confirmInput.value;
  const passVal = passwordInput.value;

  if (val.length === 0) {
    showError(confirmInput, confirmError, "Please confirm your password.");
    return false;
  }
  if (val !== passVal) {
    showError(confirmInput, confirmError, "Passwords do not match.");
    return false;
  }

  showSuccess(confirmInput, confirmError);
  return true;
}

function preventSpaces(e) {
  if (e.type === "keydown" && e.key === " ") {
    e.preventDefault();
    return;
  }

  if (e.type === "input") {
    const cursor = e.target.selectionStart;
    const cleaned = e.target.value.replace(/\s/g, "");
    if (cleaned !== e.target.value) {
      e.target.value = cleaned;
      e.target.setSelectionRange(cursor - 1, cursor - 1);
    }
  }
}

usernameInput.addEventListener("keydown", preventSpaces);
usernameInput.addEventListener("input",   preventSpaces);
emailInput.addEventListener("keydown",    preventSpaces);
emailInput.addEventListener("input",      preventSpaces);
usernameInput.addEventListener("blur",  validateUsername);
emailInput.addEventListener("blur",     validateEmail);
passwordInput.addEventListener("blur",  validatePassword);
confirmInput.addEventListener("blur",   validateConfirm);

usernameInput.addEventListener("input", function () {
  if (this.dataset.touched) validateUsername();
});
emailInput.addEventListener("input", function () {
  if (this.dataset.touched) validateEmail();
});
passwordInput.addEventListener("input", function () {
  if (this.dataset.touched) validatePassword();
});
confirmInput.addEventListener("input", function () {
  if (this.dataset.touched) validateConfirm();
});

[usernameInput, emailInput, passwordInput, confirmInput].forEach(function (input) {
  input.addEventListener("blur", function () {
    this.dataset.touched = "true";
  }, { once: false });
});

const spinnerStyle = document.createElement("style");
spinnerStyle.textContent = `
  @keyframes gildora-spin {
    to { transform: rotate(360deg); }
  }
  .btn-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.40);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: gildora-spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }
`;
document.head.appendChild(spinnerStyle);

function setButtonLoading() {
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.80";
  submitBtn.style.cursor  = "not-allowed";
  submitBtn.style.transform = "none";

  submitBtn.dataset.originalText = submitBtn.textContent;

  submitBtn.innerHTML = '<span class="btn-spinner"></span>Creating Account...';
}

function resetButton() {
  submitBtn.disabled = false;
  submitBtn.style.opacity   = "1";
  submitBtn.style.cursor    = "pointer";
  submitBtn.style.transform = "";
  submitBtn.textContent     = submitBtn.dataset.originalText || "Sign Up";
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isUsernameValid = validateUsername();
  const isEmailValid    = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid  = validateConfirm();

  if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {

    if (!isUsernameValid)      usernameInput.focus();
    else if (!isEmailValid)    emailInput.focus();
    else if (!isPasswordValid) passwordInput.focus();
    else                       confirmInput.focus();

    return;
  }

  setButtonLoading();

  setTimeout(function () {
    window.location.href = form.action || "login.html";
  }, 1500);
});

[usernameInput, emailInput].forEach(function (input) {
  input.addEventListener("blur", function () {
    this.value = this.value.trim();
  });
});
"use strict";

const form        = document.querySelector("form");
const nameInput   = document.getElementById("name");
const emailInput  = document.getElementById("email");
const subjectInput= document.getElementById("subject");
const msgInput    = document.getElementById("message");
const submitBtn   = form.querySelector('button[type="submit"]');

(function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .field-error-msg {
      display      : block;
      font-size    : 0.76rem;
      font-weight  : 600;
      color        : #800020;
      margin-top   : 4px;
      margin-bottom: 10px;
      min-height   : 1em;
      letter-spacing: 0.02em;
      opacity      : 0;
      transition   : opacity 0.2s ease;
    }
    .field-error-msg.visible {
      opacity: 1;
    }

    .input-invalid {
      border-color : #800020 !important;
      box-shadow   : 0 0 0 3px rgba(128, 0, 32, 0.12) !important;
      background   : #fff5f6 !important;
    }

    .input-valid {
      border-color : #2e7d32 !important;
      box-shadow   : 0 0 0 3px rgba(46, 125, 50, 0.10) !important;
      background   : #f9f9f9 !important;
    }

    #contact-success-banner {
      display        : none;
      align-items    : center;
      gap            : 14px;
      background     : #f0faf1;
      border         : 1.5px solid #2e7d32;
      border-left    : 5px solid #2e7d32;
      border-radius  : 8px;
      padding        : 18px 20px;
      margin-bottom  : 24px;
      animation      : bannerIn 0.35s ease both;
    }
    #contact-success-banner.visible {
      display: flex;
    }
    @keyframes bannerIn {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    #contact-success-banner .banner-icon {
      font-size  : 1.6rem;
      line-height: 1;
      flex-shrink: 0;
    }
    #contact-success-banner .banner-body {}
    #contact-success-banner .banner-title {
      font-family   : 'Cinzel', serif;
      font-size     : 0.92rem;
      font-weight   : 700;
      color         : #1b5e20;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom : 3px;
    }
    #contact-success-banner .banner-text {
      font-size  : 0.84rem;
      font-weight: 300;
      color      : #2e7d32;
      line-height: 1.5;
    }

    @keyframes g-spin { to { transform: rotate(360deg); } }
    .btn-spinner {
      display      : inline-block;
      width        : 14px;
      height       : 14px;
      border       : 2px solid rgba(255,255,255,0.35);
      border-top-color: #fff;
      border-radius: 50%;
      animation    : g-spin 0.7s linear infinite;
      vertical-align: middle;
      margin-right : 8px;
    }

    #redirect-notice {
      display    : none;
      font-size  : 0.80rem;
      font-weight: 400;
      color      : #555;
      text-align : center;
      margin-top : 8px;
    }
    #redirect-notice.visible { display: block; }
  `;
  document.head.appendChild(style);
})();

function createErrorSpan(input, id) {
  const span = document.createElement("span");
  span.id    = id;
  span.classList.add("field-error-msg");
  span.setAttribute("role",      "alert");
  span.setAttribute("aria-live", "polite");
  input.insertAdjacentElement("afterend", span);
  return span;
}

const nameError    = createErrorSpan(nameInput,    "err-name");
const emailError   = createErrorSpan(emailInput,   "err-email");
const subjectError = createErrorSpan(subjectInput, "err-subject");
const msgError     = createErrorSpan(msgInput,     "err-message");
const successBanner = document.createElement("div");
successBanner.id = "contact-success-banner";
successBanner.setAttribute("role", "status");
successBanner.innerHTML = `
  <span class="banner-icon">✅</span>
  <div class="banner-body">
    <p class="banner-title">Message Sent Successfully!</p>
    <p class="banner-text">
      Thank you! Your message has been sent successfully.
      We'll get back to you within 1–2 business days.
    </p>
  </div>
`;
form.insertAdjacentElement("beforebegin", successBanner);

const redirectNotice = document.createElement("p");
redirectNotice.id = "redirect-notice";
redirectNotice.textContent = "Redirecting you to the home page…";
successBanner.insertAdjacentElement("afterend", redirectNotice);

function showFieldError(input, errorEl, message) {
  input.classList.remove("input-valid");
  input.classList.add("input-invalid");
  errorEl.textContent = "⚠ " + message;
  errorEl.classList.add("visible");
}

function showFieldSuccess(input, errorEl) {
  input.classList.remove("input-invalid");
  input.classList.add("input-valid");
  errorEl.textContent = "";
  errorEl.classList.remove("visible");
}

function clearFieldState(input, errorEl) {
  input.classList.remove("input-invalid", "input-valid");
  errorEl.textContent = "";
  errorEl.classList.remove("visible");
}

function validateName() {
  const val     = nameInput.value.trim();
  const letters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/; 

  if (val.length === 0) {
    showFieldError(nameInput, nameError, "Name is required.");
    return false;
  }
  if (val.length < 3) {
    showFieldError(nameInput, nameError, "Name must be at least 3 characters.");
    return false;
  }
  if (!letters.test(val)) {
    showFieldError(nameInput, nameError, "Name should contain letters only.");
    return false;
  }

  showFieldSuccess(nameInput, nameError);
  return true;
}

function validateEmail() {
  const val     = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;  

  if (val.length === 0) {
    showFieldError(emailInput, emailError, "Email address is required.");
    return false;
  }
  if (!pattern.test(val)) {
    showFieldError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  }

  showFieldSuccess(emailInput, emailError);
  return true;
}

function validateSubject() {
  const val = subjectInput.value.trim();

  if (val.length === 0) {
    showFieldError(subjectInput, subjectError, "Subject is required.");
    return false;
  }
  if (val.length < 5) {
    showFieldError(subjectInput, subjectError, "Subject must be at least 5 characters.");
    return false;
  }

  showFieldSuccess(subjectInput, subjectError);
  return true;
}

function validateMessage() {
  const val = msgInput.value.trim();

  if (val.length === 0) {
    showFieldError(msgInput, msgError, "Message is required.");
    return false;
  }
  if (val.length < 20) {
    showFieldError(msgInput, msgError,
      `Message must be at least 20 characters. (${val.length}/20)`);
    return false;
  }

  showFieldSuccess(msgInput, msgError);
  return true;
}

function validateForm() {
  const nameOk    = validateName();
  const emailOk   = validateEmail();
  const subjectOk = validateSubject();
  const msgOk     = validateMessage();

  return nameOk && emailOk && subjectOk && msgOk;
}

function showSuccessMessage() {
  const formData = {
    name   : nameInput.value.trim(),
    email  : emailInput.value.trim(),
    subject: subjectInput.value.trim(),
    message: msgInput.value.trim(),
    sentAt : new Date().toISOString(),   
  };

  console.log("📬 GILDORA — New Contact Submission:");
  console.table(formData);

  successBanner.classList.add("visible");

  form.style.display = "none";

  redirectNotice.classList.add("visible");

  let seconds = 2;

  const countdown = setInterval(function () {
    seconds -= 1;
    redirectNotice.textContent =
      `Redirecting you to the home page in ${seconds} second${seconds !== 1 ? "s" : ""}…`;

    if (seconds <= 0) {
      clearInterval(countdown);
      window.location.href = "../index.html";
    }
  }, 1000);
}

function setButtonSending() {
  submitBtn.disabled            = true;
  submitBtn.style.opacity       = "0.80";
  submitBtn.style.cursor        = "not-allowed";
  submitBtn.style.transform     = "none";
  submitBtn.dataset.originalText = submitBtn.textContent.trim();
  submitBtn.innerHTML = '<span class="btn-spinner"></span>Sending…';
}

function resetButton() {
  submitBtn.disabled        = false;
  submitBtn.style.opacity   = "1";
  submitBtn.style.cursor    = "pointer";
  submitBtn.style.transform = "";
  submitBtn.textContent     = submitBtn.dataset.originalText || "Send Message";
}
const fieldValidators = [
  { input: nameInput,    fn: validateName    },
  { input: emailInput,   fn: validateEmail   },
  { input: subjectInput, fn: validateSubject },
  { input: msgInput,     fn: validateMessage },
];

fieldValidators.forEach(function ({ input, fn }) {

  input.addEventListener("blur", fn);

  input.addEventListener("input", function () {
    if (this.dataset.touched === "true") fn();
  });

  input.addEventListener("blur", function () {
    this.dataset.touched = "true";
  });

  input.addEventListener("focus", function () {
    if (this.classList.contains("input-invalid")) {
      clearFieldState(
        this,
        document.getElementById("err-" + this.id)
      );
    }
  });
});

[nameInput, emailInput, subjectInput].forEach(function (input) {
  input.addEventListener("blur", function () {
    this.value = this.value.trim();
  });
});

emailInput.addEventListener("keydown", function (e) {
  if (e.key === " ") e.preventDefault();
});
emailInput.addEventListener("input", function () {
  const pos     = this.selectionStart;
  const cleaned = this.value.replace(/\s/g, "");
  if (cleaned !== this.value) {
    this.value = cleaned;
    this.setSelectionRange(pos - 1, pos - 1);
  }
});


form.addEventListener("submit", function (e) {

  e.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    const firstError = form.querySelector(".input-invalid");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus();
    }
    return;   
  }

  setButtonSending();

  setTimeout(function () {
    showSuccessMessage();
  }, 800);
});
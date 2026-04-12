"use strict";

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const msgInput = document.getElementById("message");
const submitMsg = document.getElementById("submit-message");

// Helper to create error messages below inputs
function createErrorSpan(input) {
  const span = document.createElement("span");
  span.className = "error-msg";
  input.insertAdjacentElement("afterend", span);
  return span;
}

const nameError = createErrorSpan(nameInput);
const emailError = createErrorSpan(emailInput);
const subjectError = createErrorSpan(subjectInput);
const msgError = createErrorSpan(msgInput);

// Clear submit message when user edits form
function clearSubmitMsg() {
  submitMsg.textContent = "";
  submitMsg.className = "submit-msg"; // Reset classes
}

function showError(input, errorEl, message) {
  input.style.borderColor = "var(--color-form-error)";
  input.style.boxShadow = "0 0 0 3px rgba(128, 0, 32, 0.1)";
  errorEl.textContent = message;
  clearSubmitMsg();
}

function showSuccess(input, errorEl) {
  input.style.borderColor = "var(--color-form-success)";
  input.style.boxShadow = "none";
  errorEl.textContent = "";
  clearSubmitMsg();
}

function validateName() {
  const val = nameInput.value.trim();
  const letters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

  if (val.length === 0) {
    showError(nameInput, nameError, "Name is required.");
    return false;
  }
  if (val.length < 3) {
    showError(nameInput, nameError, "Name must be at least 3 characters.");
    return false;
  }
  if (!letters.test(val)) {
    showError(nameInput, nameError, "Name should contain letters only.");
    return false;
  }
  showSuccess(nameInput, nameError);
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

function validateSubject() {
  const val = subjectInput.value.trim();

  if (val.length === 0) {
    showError(subjectInput, subjectError, "Subject is required.");
    return false;
  }
  if (val.length < 5) {
    showError(
      subjectInput,
      subjectError,
      "Subject must be at least 5 characters.",
    );
    return false;
  }
  showSuccess(subjectInput, subjectError);
  return true;
}

function validateMessage() {
  const val = msgInput.value.trim();

  if (val.length === 0) {
    showError(msgInput, msgError, "Message is required.");
    return false;
  }
  if (val.length < 20) {
    showError(
      msgInput,
      msgError,
      `Message must be at least 20 characters. (${val.length}/20)`,
    );
    return false;
  }
  showSuccess(msgInput, msgError);
  return true;
}

// Event Listeners for real-time validation
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
subjectInput.addEventListener("blur", validateSubject);
msgInput.addEventListener("blur", validateMessage);

nameInput.addEventListener("input", () => {
  if (nameInput.value.length > 0) validateName();
});
emailInput.addEventListener("input", () => {
  if (emailInput.value.length > 0) validateEmail();
});
subjectInput.addEventListener("input", () => {
  if (subjectInput.value.length > 0) validateSubject();
});
msgInput.addEventListener("input", () => {
  if (msgInput.value.length > 0) validateMessage();
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isSubjectValid = validateSubject();
  const isMessageValid = validateMessage();

  if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
    return;
  }

  const btn = form.querySelector(".btn-submit");
  const originalText = btn.textContent;

  // UI Loading State
  btn.textContent = "Sending...";
  btn.disabled = true;

  // Simulate a brief network delay, then show success
  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;

    // Reset the form values
    form.reset();

    // Reset the green borders back to default
    nameInput.style.borderColor = "var(--color-border-default)";
    emailInput.style.borderColor = "var(--color-border-default)";
    subjectInput.style.borderColor = "var(--color-border-default)";
    msgInput.style.borderColor = "var(--color-border-default)";

    // Show success message (using the CSS classes from our style.css)
    submitMsg.textContent = "Message sent successfully! We'll be in touch.";
    submitMsg.className = "submit-msg success";
  }, 1000);
});

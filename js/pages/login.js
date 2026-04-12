"use strict";
const currentUser = JSON.parse(localStorage.getItem("credentials"));
if (currentUser) {
  window.location.href = "../index.html";
}
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitError = document.getElementById("submit-error");

// Helper to create error messages below inputs
function createErrorSpan(input) {
  const span = document.createElement("span");
  span.className = "error-msg";
  input.insertAdjacentElement("afterend", span);
  return span;
}

const emailError = createErrorSpan(emailInput);
const passwordError = createErrorSpan(passwordInput);

// Clear submit error when user starts typing again
function clearSubmitError() {
  submitError.textContent = "";
}

function showError(input, errorEl, message) {
  input.style.borderColor = "var(--color-form-error)";
  input.style.boxShadow = "0 0 0 3px rgba(128, 0, 32, 0.1)";
  errorEl.textContent = message;
  clearSubmitError();
}

function showSuccess(input, errorEl) {
  input.style.borderColor = "var(--color-form-success)";
  input.style.boxShadow = "none";
  errorEl.textContent = "";
  clearSubmitError();
}

function validateEmail() {
  const val = emailInput.value.trim();
  if (val.length === 0) {
    showError(emailInput, emailError, "Email address is required.");
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
  showSuccess(passwordInput, passwordError);
  return true;
}

// Event Listeners for inline validation styling
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);

emailInput.addEventListener("input", () => {
  if (emailInput.value.length > 0) validateEmail();
});
passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length > 0) validatePassword();
});

// Handle Form Submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  // Stop if basic form validation fails
  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Retrieve existing users from local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user matching email and password
  const validUser = users.find(
    (u) => u.email === email && u.password === password,
  );

  if (validUser) {
    // 1. Create the credentials token (excluding sensitive data like password)
    const credentials = {
      username: validUser.username,
      email: validUser.email,
      role: validUser.role,
      phone: validUser.phone,
      address: validUser.address,
      memberSince: validUser.memberSince
    };

    // 2. Save token to local storage
    localStorage.setItem("credentials", JSON.stringify(credentials));

    // 3. Redirect to the homepage after successful login
    window.location.href = "../index.html";
  } else {
    // Show error UNDER the submit button
    submitError.textContent = "Invalid email or password. Please try again.";

    // Highlight inputs slightly red to indicate error
    emailInput.style.borderColor = "var(--color-form-error)";
    passwordInput.style.borderColor = "var(--color-form-error)";
  }
});

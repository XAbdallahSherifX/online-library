"use strict";
const currentUser = JSON.parse(localStorage.getItem("credentials"));
if (currentUser) {
  window.location.href = "../index.html";
}
const form = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm_password");
const submitError = document.getElementById("submit-error"); // Target for existing user error

// Helper to create error messages below inputs
function createErrorSpan(input) {
  const span = document.createElement("span");
  span.className = "error-msg";
  input.insertAdjacentElement("afterend", span);
  return span;
}

const usernameError = createErrorSpan(usernameInput);
const emailError = createErrorSpan(emailInput);
const passwordError = createErrorSpan(passwordInput);
const confirmError = createErrorSpan(confirmInput);

// Clear submit error when user edits form
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

function validateUsername() {
  const val = usernameInput.value.trim();
  if (val.length === 0) {
    showError(usernameInput, usernameError, "Username is required.");
    return false;
  }
  if (val.length < 3) {
    showError(
      usernameInput,
      usernameError,
      "Username must be at least 3 characters.",
    );
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
  if (val.length < 6) {
    showError(
      passwordInput,
      passwordError,
      "Password must be at least 6 characters.",
    );
    return false;
  }
  showSuccess(passwordInput, passwordError);
  if (confirmInput.value.length > 0) {
    validateConfirm();
  }
  return true;
}

function validateConfirm() {
  const val = confirmInput.value;
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

// Event Listeners for real-time validation
usernameInput.addEventListener("blur", validateUsername);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
confirmInput.addEventListener("blur", validateConfirm);

usernameInput.addEventListener("input", () => {
  if (usernameInput.value.length > 0) validateUsername();
});
emailInput.addEventListener("input", () => {
  if (emailInput.value.length > 0) validateEmail();
});
passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length > 0) validatePassword();
});
confirmInput.addEventListener("input", () => {
  if (confirmInput.value.length > 0) validateConfirm();
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirm();

  if (
    !isUsernameValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !isConfirmValid
  ) {
    return;
  }

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const role = form.querySelector('input[name="role"]:checked').value;

  // Retrieve existing users from local storage or initialize empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if username or email already exists
  const userExists = users.some(
    (u) => u.username === username || u.email === email,
  );
  if (userExists) {
    // Show error UNDER the submit button instead of an alert
    submitError.textContent =
      "An account with this username or email already exists.";
    return;
  }

  // Create new user object dynamically based on role
  const newUser = {
    username: username,
    email: email,
    password: password,
    role: role,
  };

  // Assign role-specific arrays
  if (role === "admin") {
    newUser.addedBooks = [];
  } else {
    // For normal user/student
    newUser.borrowedBooks = [];
  }

  // Save to local storage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Instantly redirect to login
  window.location.href = "login.html";
});

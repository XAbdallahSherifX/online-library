"use strict";
const currentUser = JSON.parse(localStorage.getItem("credentials"));
if (!currentUser|| currentUser.role !== "admin") {
  window.location.href = "../index.html";
}

const form = document.getElementById("book-form");
const submitError = document.getElementById("submit-error");

// Input Elements
const inputs = {
  Title: document.getElementById("Title"),
  Author: document.getElementById("Author"),
  ISBN: document.getElementById("ISBN"),
  Publisher: document.getElementById("Publisher"),
  Publication_Year: document.getElementById("Publication-Year"),
  Language: document.getElementById("Language"),
  Category: document.getElementById("Category"),
  Call_Number: document.getElementById("Call-Number"),
  Total_Copies: document.getElementById("Total-Copies"),
  Edition: document.getElementById("Edition"),
  Cover_Image: document.getElementById("Cover-Image"),
  Description: document.getElementById("Description"),
};

// Helper to get dynamic edit mode (Evaluated exactly when needed, not just on load)
const checkIsEditMode = () => inputs.ISBN.readOnly;

// Generate error spans
const errors = {};
Object.keys(inputs).forEach((key) => {
  const span = document.createElement("span");
  span.className = "error-msg";
  inputs[key].insertAdjacentElement("afterend", span);
  errors[key] = span;
});

// Create an Image Preview Container for Edit Mode
const imagePreviewContainer = document.createElement("div");
imagePreviewContainer.id = "edit-image-preview";
imagePreviewContainer.style.marginTop = "8px";
imagePreviewContainer.style.fontSize = "0.85rem";
imagePreviewContainer.style.color = "var(--color-text-secondary)";
inputs.Cover_Image.insertAdjacentElement("afterend", imagePreviewContainer);

// Function to fetch and show the existing image if we are editing
function loadExistingImagePreview() {
  if (checkIsEditMode()) {
    const booksArray = JSON.parse(localStorage.getItem("books")) || [];
    const existingBook = booksArray.find((b) => b.ISBN === inputs.ISBN.value);

    if (existingBook && existingBook.Cover_Image) {
      imagePreviewContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(255,255,255,0.5); border: 1px solid var(--color-border-default); border-radius: 6px;">
          <img src="${existingBook.Cover_Image}" alt="Current Cover" style="height: 60px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <span style="line-height: 1.4;"><strong>Current Image Retained</strong><br/>Upload a new file above to replace it, or leave it empty to keep this one.</span>
        </div>
      `;
    }
  }
}

// Check for existing image shortly after page load (Allows Edit_Book.js time to populate the ISBN field)
setTimeout(loadExistingImagePreview, 150);

// ---------------------------------
// Form Error/Success Helpers
// ---------------------------------

function clearSubmitError() {
  submitError.textContent = "";
}

function showError(inputKey, message) {
  inputs[inputKey].style.borderColor = "var(--color-form-error)";
  inputs[inputKey].style.boxShadow = "0 0 0 3px rgba(128, 0, 32, 0.1)";
  errors[inputKey].textContent = message;
  clearSubmitError();
  return false;
}

function showSuccess(inputKey) {
  inputs[inputKey].style.borderColor = "var(--color-form-success)";
  inputs[inputKey].style.boxShadow = "none";
  errors[inputKey].textContent = "";
  clearSubmitError();
  return true;
}

// ---------------------------------
// Validation Rules
// ---------------------------------

function validateTitle() {
  const val = inputs.Title.value.trim();
  if (val.length === 0) return showError("Title", "Title is required.");
  return showSuccess("Title");
}

function validateAuthor() {
  const val = inputs.Author.value.trim();
  if (val.length === 0) return showError("Author", "Author name is required.");
  return showSuccess("Author");
}

function validateISBN() {
  const val = inputs.ISBN.value.trim();
  if (val.length === 0) return showError("ISBN", "ISBN is required.");
  if (parseInt(val) < 1)
    return showError("ISBN", "ISBN cannot be negative or zero.");

  // Prevent duplicate check if the field is Read-Only (Edit Mode)
  if (!checkIsEditMode()) {
    const booksArray = JSON.parse(localStorage.getItem("books")) || [];
    const isDuplicate = booksArray.some((b) => b.ISBN === val);
    if (isDuplicate)
      return showError("ISBN", "A book with this ISBN already exists.");
  }
  return showSuccess("ISBN");
}

function validatePublisher() {
  const val = inputs.Publisher.value.trim();
  if (val.length === 0) return showError("Publisher", "Publisher is required.");
  return showSuccess("Publisher");
}

function validateYear() {
  const val = inputs.Publication_Year.value;
  if (!val)
    return showError("Publication_Year", "Publication Year is required.");

  const selectedYear = new Date(val).getFullYear();
  const currentYear = new Date().getFullYear();
  if (selectedYear > currentYear)
    return showError("Publication_Year", "Year cannot be in the future.");
  if (selectedYear < 1000)
    return showError(
      "Publication_Year",
      "Please enter a valid historical year.",
    );

  return showSuccess("Publication_Year");
}

function validateSelects() {
  let valid = true;
  if (inputs.Language.value === "")
    valid = showError("Language", "Please select a language.");
  else showSuccess("Language");

  if (inputs.Category.value === "" || inputs.Category.value === "select")
    valid = showError("Category", "Please select a category.");
  else showSuccess("Category");

  return valid;
}

function validateCallNumber() {
  const val = inputs.Call_Number.value.trim();
  if (val.length < 2 || val.length > 3)
    return showError("Call_Number", "Call Number must be 2-3 characters.");
  return showSuccess("Call_Number");
}

function validateCopies() {
  const val = parseInt(inputs.Total_Copies.value);
  if (isNaN(val) || val < 0)
    return showError("Total_Copies", "Copies must be 0 or more.");
  return showSuccess("Total_Copies");
}

function validateEdition() {
  const val = inputs.Edition.value.trim();
  if (val.length === 0) return showError("Edition", "Edition is required.");
  return showSuccess("Edition");
}

function validateDescription() {
  const val = inputs.Description.value.trim();
  if (val.length < 10)
    return showError(
      "Description",
      "Description must be at least 10 characters.",
    );
  return showSuccess("Description");
}

function validateImage() {
  if (checkIsEditMode()) return true; // Image is optional during edit mode
  if (inputs.Cover_Image.value === "")
    return showError("Cover_Image", "Cover image is required for new books.");
  return showSuccess("Cover_Image");
}

// Attach real-time listeners
Object.keys(inputs).forEach((key) => {
  inputs[key].addEventListener("blur", () => {
    if (key === "Title") validateTitle();
    if (key === "Author") validateAuthor();
    if (key === "ISBN") validateISBN();
    if (key === "Publisher") validatePublisher();
    if (key === "Publication_Year") validateYear();
    if (key === "Language" || key === "Category") validateSelects();
    if (key === "Call_Number") validateCallNumber();
    if (key === "Total_Copies") validateCopies();
    if (key === "Edition") validateEdition();
    if (key === "Description") validateDescription();
    if (key === "Cover_Image") validateImage();
  });

  inputs[key].addEventListener("input", () => {
    if (inputs[key].value.length > 0) {
      errors[key].textContent = "";
      inputs[key].style.borderColor = "var(--color-border-default)";
      inputs[key].style.boxShadow = "none";
    }
  });
});

// ---------------------------------
// Form Submission Logic
// ---------------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const validations = [
    validateTitle(),
    validateAuthor(),
    validateISBN(),
    validatePublisher(),
    validateYear(),
    validateSelects(),
    validateCallNumber(),
    validateCopies(),
    validateEdition(),
    validateDescription(),
    validateImage(),
  ];

  if (validations.includes(false)) {
    submitError.textContent =
      "Please fix the highlighted errors before submitting.";
    return;
  }

  let booksArray = JSON.parse(localStorage.getItem("books")) || [];

  // Parse Cover Image Path correctly to act like the assets folder
  let coverImagePath = "";
  if (inputs.Cover_Image.value !== "") {
    let filename = inputs.Cover_Image.value.split("\\").pop().split("/").pop();
    coverImagePath = `../assets/books/${filename}`;
  }

  let book = {
    Title: inputs.Title.value,
    Author: inputs.Author.value,
    ISBN: inputs.ISBN.value,
    Publisher: inputs.Publisher.value,
    Publication_Year: inputs.Publication_Year.value,
    Language: inputs.Language.value,
    Category: inputs.Category.value,
    Description: inputs.Description.value,
    Call_Number: inputs.Call_Number.value,
    Total_Copies: parseInt(inputs.Total_Copies.value),
    Cover_Image: coverImagePath,
    Edition: inputs.Edition.value,
    Is_Available: parseInt(inputs.Total_Copies.value) > 0,
    Borrowed: 0,
  };

  const existingIndex = booksArray.findIndex((b) => b.ISBN === book.ISBN);

  if (existingIndex !== -1 && checkIsEditMode()) {
    // Editing existing book
    book.Borrowed = booksArray[existingIndex].Borrowed;
    if (coverImagePath === "") {
      book.Cover_Image = booksArray[existingIndex].Cover_Image; // retain old image if not updated
    }
    booksArray[existingIndex] = book;
    // Alerts removed as requested
  } else {
    // Adding a brand new book
    booksArray.push(book);

    // Admin User Tracking Feature
    let currentUser = JSON.parse(localStorage.getItem("credentials"));
    if (currentUser && currentUser.role === "admin") {
      let usersArray = JSON.parse(localStorage.getItem("users")) || [];
      let adminIndex = usersArray.findIndex(
        (u) =>
          u.username === currentUser.username || u.email === currentUser.email,
      );

      if (adminIndex > -1) {
        if (!usersArray[adminIndex].addedBooks)
          usersArray[adminIndex].addedBooks = [];
        if (!usersArray[adminIndex].addedBooks.includes(book.ISBN)) {
          usersArray[adminIndex].addedBooks.push(book.ISBN);
          localStorage.setItem("users", JSON.stringify(usersArray));
        }
      }
    }
  }

  // Save the collective books to localstorage and redirect silently
  localStorage.setItem("books", JSON.stringify(booksArray));
  window.location.href = "admin_dashboard.html";
});

const currentUser = JSON.parse(localStorage.getItem("credentials"));

if (!currentUser || currentUser.role !== "user") {
  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const targetISBN = urlParams.get("bookISBN");

  const layout = document.getElementById("borrow-layout");
  const errorMsg = document.getElementById("error-msg");
  const form = document.getElementById("confirm-borrow-form");

  if (!targetISBN) {
    showError("Invalid Link", "No book ISBN was provided.");
    return;
  }

  const allBooks = JSON.parse(localStorage.getItem("books")) || [];
  const bookIndex = allBooks.findIndex(
    (b) => String(b.ISBN) === String(targetISBN),
  );

  if (bookIndex === -1) {
    showError(
      "Book Not Found",
      "We couldn't find the book you are trying to borrow.",
    );
    return;
  }

  const book = allBooks[bookIndex];
  const totalCopies = parseInt(book.Total_Copies) || 0;
  const borrowedCount = parseInt(book.Borrowed) || 0;
  const availableCopies = totalCopies - borrowedCount;

  if (
    availableCopies <= 0 ||
    book.Is_Available === false ||
    book.Is_Available === "false"
  ) {
    showError(
      "Out of Stock",
      "Sorry, all copies of this book are currently borrowed.",
    );
    return;
  }

  document.getElementById("summary-img").src =
    book.Cover_Image || "../assets/images/portrait_placeholder.png";
  document.getElementById("summary-title").textContent =
    book.Title || "Untitled Book";
  document.getElementById("summary-author").textContent =
    `by ${book.Author || "Unknown"}`;
  document.getElementById("summary-isbn").textContent = `ISBN: ${book.ISBN}`;
  document.getElementById("target-isbn").value = book.ISBN;

// === fill input fields with user data ===
  const phoneInputField = document.getElementById("phone");
  const addressInputField = document.getElementById("address");

  //if user has phone/address in their credentials, pre-fill the form fields with that data
  if (phoneInputField && currentUser.phone) {
    phoneInputField.value = currentUser.phone;
  }
  if (addressInputField && currentUser.address) {
    addressInputField.value = currentUser.address;
  }
  // ===============================================

  layout.style.display = "flex";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    allBooks[bookIndex].Borrowed = borrowedCount + 1;

    // Calculate newly available inventory
    const newlyAvailable = totalCopies - allBooks[bookIndex].Borrowed;

    // If inventory hits 0, flip the Is_Available flag to false
    if (newlyAvailable <= 0) {
      allBooks[bookIndex].Is_Available = false;
    }

    // Save updated books back to localStorage
    localStorage.setItem("books", JSON.stringify(allBooks));

    // ===start edit===
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const userForUpdate = JSON.parse(localStorage.getItem("credentials"));

    if (phoneInput && addressInput && userForUpdate) {
      // 1.update credentials in localStorage
      userForUpdate.phone = phoneInput.value.trim();
      userForUpdate.address = addressInput.value.trim();
      localStorage.setItem("credentials", JSON.stringify(userForUpdate));

      // 2.update user data in users array
      let allUsersData = JSON.parse(localStorage.getItem("users")) || [];
      let indexToUpdate = allUsersData.findIndex(
        (u) => u.email === userForUpdate.email,
      );
      if (indexToUpdate > -1) {
        allUsersData[indexToUpdate].phone = userForUpdate.phone;
        allUsersData[indexToUpdate].address = userForUpdate.address;
        localStorage.setItem("users", JSON.stringify(allUsersData));
      }
    }
    // ===end edit===
    // 3. Add to User's personal borrowed list so it shows up in "borrowed_books.html"
    let currentUser = JSON.parse(localStorage.getItem("credentials"));
    if (currentUser) {
      let usersArray = JSON.parse(localStorage.getItem("users")) || [];
      let uIndex = usersArray.findIndex(
        (u) =>
          u.username === currentUser.username || u.email === currentUser.email,
      );

      if (uIndex > -1) {
        if (!usersArray[uIndex].borrowedBooks) {
          usersArray[uIndex].borrowedBooks = [];
        }
        usersArray[uIndex].borrowedBooks.push({
          isbn: book.ISBN,
          borrowDate: new Date().toISOString(),
        });

        localStorage.setItem("users", JSON.stringify(usersArray));
      }
    }
    window.location.href = "borrowed_books.html";
  });

  function showError(title, desc) {
    layout.style.display = "none";
    errorMsg.style.display = "block";
    if (title) document.getElementById("error-title").textContent = title;
    if (desc) document.getElementById("error-desc").textContent = desc;
  }
});

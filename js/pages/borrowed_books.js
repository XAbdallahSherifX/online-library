const currentUser = JSON.parse(localStorage.getItem("credentials"));
if (!currentUser||currentUser.role !== "user") {
  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Security Check: Must be logged in
  const currentCreds = JSON.parse(localStorage.getItem("credentials"));
  if (!currentCreds) {
    window.location.href = "login.html";
    return;
  }

  const grid = document.getElementById("borrowed-grid");
  const emptyState = document.getElementById("empty-state");

  // 2. Fetch Databases
  let allUsers = JSON.parse(localStorage.getItem("users")) || [];
  let allBooks = JSON.parse(localStorage.getItem("books")) || [];

  // Find current user object
  const userIndex = allUsers.findIndex(
    (u) =>
      u.username === currentCreds.username || u.email === currentCreds.email,
  );

  if (userIndex === -1) {
    // Fallback if user data is somehow missing
    window.location.href = "login.html";
    return;
  }

  const user = allUsers[userIndex];

  // 3. Render Function
  function renderBorrowedBooks() {
    grid.innerHTML = "";
    const borrowedList = user.borrowedBooks || [];

    if (borrowedList.length === 0) {
      emptyState.style.display = "block";
      return;
    }

    emptyState.style.display = "none";

    // Loop through user's borrowed items backwards (newest first)
    [...borrowedList].reverse().forEach((borrowRecord, reversedIndex) => {
      // Find the global book data
      const book = allBooks.find(
        (b) => String(b.ISBN) === String(borrowRecord.isbn),
      );

      if (!book) return; // Skip if book was deleted from system

      // Actual index in the original array (needed for deletion)
      const originalIndex = borrowedList.length - 1 - reversedIndex;

      // Date formatting
      const borrowDateObj = new Date(borrowRecord.borrowDate);
      const borrowDateStr = borrowDateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const dueDateObj = new Date(borrowDateObj);
      dueDateObj.setDate(dueDateObj.getDate() + 14);
      const dueDateStr = dueDateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const title = book.Title || "Untitled";
      const author = book.Author || "Unknown";
      const image =
        book.Cover_Image || "../assets/images/portrait_placeholder.png";

      const card = document.createElement("div");
      card.classList.add("borrowed-card");

      card.innerHTML = `
                <div class="card-image-container">
                    <img src="${image}" alt="${title}" class="card-image" onerror="this.src='../assets/images/portrait_placeholder.png'">
                </div>
                <div class="card-content">
                    <div class="card-header-row">
                        <div>
                            <a href="book_details.html?isbn=${book.ISBN}" class="card-title">${title}</a>
                            <p class="card-author">by ${author}</p>
                        </div>
                    </div>
                    
                    <div class="card-meta-grid">
                        <div class="meta-box">
                            <span class="meta-label">Borrowed On</span>
                            <span class="meta-value">${borrowDateStr}</span>
                        </div>
                        <div class="meta-box">
                            <span class="meta-label">Return By</span>
                            <span class="meta-value">${dueDateStr}</span>
                        </div>
                    </div>
                    
                </div>
            `;

      grid.appendChild(card);
    });

   
  }
  renderBorrowedBooks();
});

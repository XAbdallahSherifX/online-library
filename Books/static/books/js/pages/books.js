document.addEventListener("DOMContentLoaded", () => {
  const booksGrid = document.getElementById("books-grid");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-books");
  const noResultsMsg = document.getElementById("no-results-msg");

  // Load Books from LocalStorage
  let allBooks = JSON.parse(localStorage.getItem("books")) || [];

  // 2. Render Function
  function renderBooks(booksToRender) {
    booksGrid.innerHTML = "";

    if (booksToRender.length === 0) {
      noResultsMsg.style.display = "block";
    } else {
      noResultsMsg.style.display = "none";

      booksToRender.forEach((book) => {
        // Map to your Add_Book.js schema
        const isAvailable =
          book.Is_Available === true || book.Is_Available === "true";
        const statusClass = isAvailable
          ? "status-available"
          : "status-unavailable";
        const statusText = isAvailable ? "Available" : "Not Available";

        // Fallbacks in case some fields are missing
        const coverImage =
          book.Cover_Image || "../assets/images/portrait_placeholder.png";
        const rating = book.Rating || "4.5"; // Add_Book doesn't have rating, so we mock a default
        const category = book.Category || "Uncategorized";
        const author = book.Author || "Unknown Author";
        const title = book.Title || "Untitled";

        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
                    <a href="book_details.html?isbn=${book.ISBN}" class="book-img-link">
                        <img src="${coverImage}" alt="${title}" class="book-image" onerror="this.src='../assets/images/portrait_placeholder.png'" />
                    </a>
                    <div class="book-info">
                        <a href="book_details.html?isbn=${book.ISBN}" class="book-title">${title}</a>
                        <span class="book-author">by ${author}</span>
                        
                        <span class="book-status ${statusClass}">${statusText}</span>
                        
                        <form action="confirm_borrowing.html">
                            <input type="hidden" name="bookISBN" value="${book.ISBN}">
                            <button type="submit" class="borrow-btn" ${!isAvailable ? "disabled" : ""}>
                                ${isAvailable ? "Borrow Book" : "Currently Unavailable"}
                            </button>
                        </form>
                    </div>
                `;
        booksGrid.appendChild(card);
      });
    }
  }

  // 3. Filter and Sort Logic
  function handleFilterAndSort() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortValue = sortSelect.value;

    // Filter: Title OR Author OR Category (Using safe fallbacks if undefined)
    let filteredBooks = allBooks.filter((book) => {
      const titleMatch = (book.Title || "").toLowerCase().includes(searchTerm);
      const authorMatch = (book.Author || "")
        .toLowerCase()
        .includes(searchTerm);
      const categoryMatch = (book.Category || "")
        .toLowerCase()
        .includes(searchTerm);

      return titleMatch || authorMatch || categoryMatch;
    });

    // Sort
    filteredBooks.sort((a, b) => {
      const titleA = (a.Title || "").toLowerCase();
      const titleB = (b.Title || "").toLowerCase();

      switch (sortValue) {
        case "AZ":
          return titleA.localeCompare(titleB);
        case "ZA":
          return titleB.localeCompare(titleA);
      }
    });

    renderBooks(filteredBooks);
  }

  // Event Listeners
  searchInput.addEventListener("input", handleFilterAndSort);
  sortSelect.addEventListener("change", handleFilterAndSort);

  // Initial Load
  handleFilterAndSort();
});

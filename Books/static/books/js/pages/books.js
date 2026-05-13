document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-books");
  const booksGrid = document.getElementById("books-grid");
  const noResultsMsg = document.getElementById("no-results-msg");

  function handleFilterAndSort() {
    if (!booksGrid) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortValue = sortSelect.value;

    // Grab all the book cards Django rendered
    const bookCards = Array.from(booksGrid.querySelectorAll(".book-card"));
    let visibleCount = 0;

    // 1. Filter the books
    bookCards.forEach((card) => {
      // Extract text from the HTML elements safely
      const titleEl = card.querySelector(".book-title");
      const authorEl = card.querySelector(".book-author");
      const categoryEl = card.querySelector(".book-category");

      const title = titleEl ? titleEl.textContent.toLowerCase() : "";
      const author = authorEl ? authorEl.textContent.toLowerCase() : "";
      const category = categoryEl ? categoryEl.textContent.toLowerCase() : "";

      if (
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        category.includes(searchTerm)
      ) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // 2. Sort the visible books
    const visibleCards = bookCards.filter(
      (card) => card.style.display !== "none",
    );

    visibleCards.sort((a, b) => {
      const titleA = a.querySelector(".book-title").textContent.toLowerCase();
      const titleB = b.querySelector(".book-title").textContent.toLowerCase();

      if (sortValue === "AZ") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    // 3. Re-append them to the grid in the new sorted order
    visibleCards.forEach((card) => booksGrid.appendChild(card));

    // 4. Show/Hide "No Results" message
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  // Attach Event Listeners
  if (searchInput) searchInput.addEventListener("input", handleFilterAndSort);
  if (sortSelect) sortSelect.addEventListener("change", handleFilterAndSort);
});

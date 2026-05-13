document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const inventoryBody = document.getElementById("inventory-body");

  function handleFilter() {
    if (!inventoryBody) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const rows = Array.from(inventoryBody.querySelectorAll(".table-row"));

    rows.forEach((row) => {
      const isbnEl = row.querySelector('[data-label="ISBN"]');
      const titleEl = row.querySelector('[data-label="Book Title"]');
      const authorEl = row.querySelector('[data-label="Author"]');

      const isbn = isbnEl ? isbnEl.textContent.toLowerCase() : "";
      const title = titleEl ? titleEl.textContent.toLowerCase() : "";
      const author = authorEl ? authorEl.textContent.toLowerCase() : "";

      if (
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        isbn.includes(searchTerm)
      ) {
        row.style.display = ""; 
      } else {
        row.style.display = "none"; 
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", handleFilter);
  }
});

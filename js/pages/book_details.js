document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const targetISBN = urlParams.get("isbn");

  const detailsContent = document.getElementById("details-content");
  const errorMsg = document.getElementById("error-msg");
  const breadcrumbTitle = document.getElementById("breadcrumb-title");

  if (!targetISBN) {
    showError();
    return;
  }

  const allBooks = JSON.parse(localStorage.getItem("books")) || [];
  const book = allBooks.find((b) => String(b.ISBN) === String(targetISBN));

  if (!book) {
    showError();
    return;
  }

  renderBookDetails(book);

  function renderBookDetails(book) {
    // Basic Info
    const title = book.Title || "Untitled Book";
    const author = book.Author || "Unknown Author";
    const category = book.Category || "Uncategorized";
    const coverImage =
      book.Cover_Image || "../assets/images/portrait_placeholder.png";

    // Extended Details
    const publisher = book.Publisher || "Unknown Publisher";
    const pubYear = book.Publication_Year
      ? new Date(book.Publication_Year).getFullYear()
      : "N/A";
    const language = book.Language || "English";
    const edition = book.Edition || "1st Edition";
    const callNumber = book.Call_Number || "N/A";
    const description =
      book.Description || "No description provided for this book.";

    // Inventory Logic (Based on Add_Book.js schema)
    const totalCopies = parseInt(book.Total_Copies) || 0;
    const borrowed = parseInt(book.Borrowed) || 0;
    const availableCopies = Math.max(0, totalCopies - borrowed);

    // Check availability strictly based on copies
    const isAvailable =
      availableCopies > 0 &&
      (book.Is_Available === true || book.Is_Available === "true");

    // Update Breadcrumb
    breadcrumbTitle.textContent = title;

    // Status visual variables
    const statusClass = isAvailable ? "status-available" : "status-unavailable";
    const statusText = isAvailable
      ? "Available to Borrow"
      : "Currently Unavailable";

    detailsContent.innerHTML = `
            <div class="book-details-card">
                <div class="details-image-wrapper">
                    <img src="${coverImage}" alt="${title} Cover" class="details-cover" onerror="this.src='../assets/images/portrait_placeholder.png'">
                </div>
                
                <div class="details-info">
                    <div class="details-header">
                        <h1 class="details-title">${title}</h1>
                        <p class="details-author">by ${author}</p>
                    </div>

                    <div class="badges-row">
                        <span class="badge ${statusClass}">${statusText}</span>
                        <span class="badge badge-category"><i class="fa-solid fa-layer-group"></i> ${category}</span>
                    </div>

                    <div class="metadata-grid">
                        <div class="meta-item">
                            <span class="meta-label">ISBN</span>
                            <span class="meta-value">${book.ISBN}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Publisher</span>
                            <span class="meta-value">${publisher}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Year</span>
                            <span class="meta-value">${pubYear}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Language</span>
                            <span class="meta-value">${language}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Edition</span>
                            <span class="meta-value">${edition}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Call Number</span>
                            <span class="meta-value">${callNumber}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Available Copies</span>
                            <span class="meta-value">${availableCopies}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Times Borrowed</span>
                            <span class="meta-value">${borrowed}</span>
                        </div>
                    </div>

                    <div class="details-description">
                        <h3>Description</h3>
                        <p>${description}</p>
                    </div>

                    <div class="action-buttons">
                        <form action="confirm_borrowing.html" style="flex: 1; display: flex;">
                            <input type="hidden" name="bookISBN" value="${book.ISBN}">
                            <button type="submit" class="btn-primary" ${!isAvailable ? "disabled" : ""}>
                                ${isAvailable ? "Borrow This Book" : "Not Available"}
                            </button>
                        </form>
                        <a href="books.html" class="btn-secondary">Back to Catalog</a>
                    </div>
                </div>
            </div>
        `;

    detailsContent.style.display = "block";
  }

  function showError() {
    detailsContent.style.display = "none";
    errorMsg.style.display = "block";
    breadcrumbTitle.textContent = "Not Found";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // --- SLIDER SCROLLING LOGIC ---
  function scrollSlider(track, direction) {
    const card = track.querySelector(".book-slide");
    if (!card) return;
    const trackStyle = window.getComputedStyle(track);
    const gap =
      parseFloat(trackStyle.gap) || parseFloat(trackStyle.columnGap) || 0;
    const cardWidth = card.getBoundingClientRect().width;
    const scrollStep = cardWidth + gap;
    const currentIndex = Math.round(track.scrollLeft / scrollStep);
    const targetIndex = currentIndex + direction;
    track.scrollTo({
      left: targetIndex * scrollStep,
      behavior: "smooth",
    });
  }

  const featuredTrack = document.querySelector("#featured-slider .book-tracks");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  if (nextBtn && prevBtn && featuredTrack) {
    nextBtn.addEventListener("click", () => scrollSlider(featuredTrack, 1));
    prevBtn.addEventListener("click", () => scrollSlider(featuredTrack, -1));
  }

  const bestsellersTrack = document.querySelector(
    "#best-sellers-slider .book-tracks",
  );
  const nextBtnBS = document.getElementById("next-btn-bs");
  const prevBtnBS = document.getElementById("prev-btn-bs");

  if (nextBtnBS && prevBtnBS && bestsellersTrack) {
    nextBtnBS.addEventListener("click", () =>
      scrollSlider(bestsellersTrack, 1),
    );
    prevBtnBS.addEventListener("click", () =>
      scrollSlider(bestsellersTrack, -1),
    );
  }

  // --- DYNAMIC BOOK INJECTION ---

  // 1. Fetch books from localStorage
  const books = JSON.parse(localStorage.getItem("books")) || [];

  // Helper function to generate HTML for a book card using YOUR specific schema
  function createBookCardHTML(book) {
    // Uses your Cover_Image key, fallbacks to book1.jpg if empty
    const imgSrc = book.Cover_Image || "assets/images/book1.jpg";

    return `
      <a href="pages/book_details.html?isbn=${book.ISBN}" class="book-slide">
        <img
          src="assets/books/${imgSrc.split("/")[3] || imgSrc.split("/").pop()}"
          alt="${book.Title}"
          width="220"
        />
        <div class="book-info">
          <h3 class="book-title">${book.Title}</h3>
          <p class="book-author">${book.Author}</p>
        </div>
      </a>
    `;
  }

  // 2. Populate First Slider (First 6 Books in the array)
  if (featuredTrack && books.length > 0) {
    featuredTrack.innerHTML = ""; // Clear the track
    const firstSixBooks = books.slice(0, 6);

    firstSixBooks.forEach((book) => {
      featuredTrack.innerHTML += createBookCardHTML(book);
    });
  }

  // 3. Populate Second Slider (Best Sellers - Most Borrowed)
  if (bestsellersTrack && books.length > 0) {
    bestsellersTrack.innerHTML = ""; // Clear the track

    // Sort descending by the 'Borrowed' property updated in confirm_borrowing.js
    const sortedByBorrowed = [...books].sort((a, b) => {
      const countA = parseInt(a.Borrowed) || 0;
      const countB = parseInt(b.Borrowed) || 0;
      return countB - countA;
    });

    const topSixBooks = sortedByBorrowed.slice(0, 6);

    topSixBooks.forEach((book) => {
      bestsellersTrack.innerHTML += createBookCardHTML(book);
    });
  }
});

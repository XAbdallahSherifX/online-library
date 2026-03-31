document.addEventListener("DOMContentLoaded", () => {
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
});

document.addEventListener('DOMContentLoaded',()=>{

const scrolling=290;
const featuredTrack = document.querySelector('#featured-slider .book-tracks');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  nextBtn.addEventListener('click', () => {
    featuredTrack.scrollBy({ left: scrolling, behavior: 'smooth' });
});

  prevBtn.addEventListener('click', () => {
    featuredTrack.scrollBy({ left: -scrolling, behavior: 'smooth' });
});



const bestsellerstrack = document.querySelector('#best-sellers-slider .book-tracks');
  const nextBtnBS = document.getElementById('next-btn-bs');
  const prevBtnBS = document.getElementById('prev-btn-bs');

  nextBtnBS.addEventListener('click', () => {
    bestsellerstrack.scrollBy({ left: scrolling, behavior: 'smooth' });
  });

  prevBtnBS.addEventListener('click', () => {
    bestsellerstrack.scrollBy({ left: -scrolling, behavior: 'smooth' });
  });


});
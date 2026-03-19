document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu-container");

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});

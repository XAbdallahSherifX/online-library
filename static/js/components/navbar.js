document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu-container");

  // Mobile Menu Toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () =>
      navMenu.classList.toggle("active"),
    );
  }

  // Auth & Dropdown Logic
  const credentials = JSON.parse(localStorage.getItem("credentials"));
  const authNav = document.getElementById("auth-buttons");
  const userNav = document.getElementById("user-menu");
  const profileBtn = document.getElementById("profile-btn");
  const dropdown = document.getElementById("profile-dropdown");
  const logoutBtn = document.getElementById("logout-btn");
  const navUsername = document.getElementById("nav-username");

  if (credentials && userNav && authNav) {
    // Show logged-in UI
    authNav.style.display = "none";
    userNav.style.display = "flex";
    navUsername.textContent = credentials.username;

    // Fix Paths: Check if current page is inside 'pages/' folder
    const isInPagesFolder = window.location.pathname.includes("/pages/");
    const pathPrefix = isInPagesFolder ? "" : "pages/";

    // Get the dynamic links
    const adminLink = document.getElementById("admin-link");
    const profileLink = dropdown.querySelector('a[href*="profile.html"]');
    const borrowedBooksLink = dropdown.querySelector(
      'a[href*="borrowed_books.html"]',
    );

    // Update link destinations dynamically
    if (profileLink) profileLink.href = `${pathPrefix}profile.html`;
    if (borrowedBooksLink)
      borrowedBooksLink.href = `${pathPrefix}borrowed_books.html`;
    if (adminLink) adminLink.href = `${pathPrefix}admin_dashboard.html`;

    // Role-based visibility
    if (credentials.role === "admin") {
      // Admins see Dashboard, but NOT Borrowed Books
      if (adminLink) adminLink.style.display = "flex";
      if (borrowedBooksLink) borrowedBooksLink.style.display = "none";
    } else {
      // Normal users see Borrowed Books, but NOT Dashboard
      if (adminLink) adminLink.style.display = "none";
      if (borrowedBooksLink) borrowedBooksLink.style.display = "flex";
    }

    // Dropdown Toggle
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });

    // Close on outside click
    window.addEventListener("click", () => dropdown.classList.remove("show"));

    // Logout logic
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("credentials");
      window.location.href = isInPagesFolder ? "../index.html" : "index.html";
    });
  }
});

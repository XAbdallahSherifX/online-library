document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu-container");

  // Mobile Menu Toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () =>
      navMenu.classList.toggle("active"),
    );
  }

  // Profile Dropdown Logic (Now independent of LocalStorage)
  const profileBtn = document.getElementById("profile-btn");
  const dropdown = document.getElementById("profile-dropdown");

  // These elements will only exist if the user is logged in (via Django's template)
  if (profileBtn && dropdown) {
    // Toggle dropdown when clicking the profile button
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents the window click event from firing immediately
      dropdown.classList.toggle("show");
    });

    // Close dropdown when clicking anywhere else on the page
    window.addEventListener("click", () => {
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    });
  }
});

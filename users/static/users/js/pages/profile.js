document.addEventListener('DOMContentLoaded', () => {
    
    const currentUser = JSON.parse(localStorage.getItem("credentials"));

    // if user is not logged in, redirect to home page (safety check)
    if (!currentUser) {
      window.location.href = "../index.html";
      return;
    }

    // Get profile elements
    const nameElement = document.getElementById("profile-name");
    const emailElement = document.getElementById("profile-email");
    const profileImageElement = document.querySelector('.profile-pic');

    // Set profile info
    if (nameElement && emailElement) {
        nameElement.textContent = `Name: ${currentUser.username}`;
        emailElement.textContent = `Email: ${currentUser.email}`;
    }
    if (profileImageElement && currentUser.profilePic) {
        profileImageElement.src = currentUser.profilePic;
    }
    // === New Additions for Phone and Address ===
    const phoneElement = document.getElementById("profile-phone");
    const addressElement = document.getElementById("profile-address");

    if (phoneElement) {
        phoneElement.textContent = `Telephone: ${currentUser.phone || "Not Set"}`;
    }
    if (addressElement) {
        addressElement.textContent = `Address: ${currentUser.address || "Not Set"}`;
    }
    // ==================================================
const memberSinceElement = document.getElementById("member-since"); 
    if (memberSinceElement) {
        // Assuming memberSince is stored in credentials, otherwise default to a static date
        const joinDate = currentUser.memberSince || "February 2026"; 
        memberSinceElement.textContent = `Member Since: ${joinDate}`;
    }

    // Display total borrowed books count
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const fullUser = users.find(u => u.email === currentUser.email);
    const totalBorrowedElement = document.getElementById("total-borrowed");
    
    if (totalBorrowedElement && fullUser) {
        const borrowedCount = fullUser.borrowedBooks ? fullUser.borrowedBooks.length : 0;
        totalBorrowedElement.textContent = `Total Borrowed Books: ${borrowedCount}`;
    }
});
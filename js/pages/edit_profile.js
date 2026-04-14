const currentUser = JSON.parse(localStorage.getItem("credentials"));
if (!currentUser) {
  window.location.href = "../index.html";
}

document.addEventListener('DOMContentLoaded', () => {
// 1. Prefill form with current user data
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');

    if (nameInput) nameInput.value = currentUser.username || "";
    if (emailInput) emailInput.value = currentUser.email || "";
    if (phoneInput) phoneInput.value = currentUser.phone || "";
    if (addressInput) addressInput.value = currentUser.address || "";
let finalImagePath = currentUser.profilePic || "../assets/images/portrait_placeholder.png";
    // 2. Handle form submission to update profile
    const editForm = document.querySelector('form');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Update currentUser object with new values
            currentUser.username = nameInput.value.trim();
            currentUser.email = emailInput.value.trim();
            currentUser.phone = phoneInput.value.trim();
            currentUser.address = addressInput.value.trim();
            currentUser.profilePic = finalImagePath;

            // Save updated credentials back to localStorage
            localStorage.setItem("credentials", JSON.stringify(currentUser));

            // Also update the user data in the "users" array in localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const index = users.findIndex(u => u.email === currentUser.email || u.username === currentUser.username);
            if (index !== -1) {
                users[index] = { ...users[index], ...currentUser };
                localStorage.setItem("users", JSON.stringify(users));
            }

            alert("Profile Updated Successfully!");
            window.location.href = "profile.html";
        });
    }
   // --- Upload from Assets Feature ---
    const profilePicInput = document.getElementById('profile_pic');
    const profileImgPreview = document.querySelector('.edit-profile-container img');

    // 1. show current profile picture on page load
    if (profileImgPreview && currentUser.profilePic) {
        profileImgPreview.src = currentUser.profilePic;
        finalImagePath = currentUser.profilePic; // initialize finalImagePath with current profile picture
    }

    // 2. change picture event listener when user selects a new file
    if (profilePicInput && profileImgPreview) {
        profilePicInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                // Assuming the file is uploaded to the "assets/Avatars" directory and named exactly as the uploaded file
                
                finalImagePath = "../assets/Avatars/" + file.name;
                profileImgPreview.src = finalImagePath;
            }
        });
    }
});
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
    //  Live Image Preview Feature
    const profilePicInput = document.getElementById('profile_pic');
    const profileImgPreview = document.querySelector('.edit-profile-container img');

    if (profilePicInput && profileImgPreview) {
        profilePicInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                // Only proceed if the selected file is an image
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                       // set the preview image source to the uploaded file's data URL
                        profileImgPreview.src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                } else {
                    alert('Please select a valid image file.');
                    profilePicInput.value = ''; 
                }
            }
        });
    }

});
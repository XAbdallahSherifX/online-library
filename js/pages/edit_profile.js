const currentUser = JSON.parse(localStorage.getItem("credentials"));
if (!currentUser) {
  window.location.href = "../index.html";
}

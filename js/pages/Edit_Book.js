// 1. Rename variable to 'adminUser' to avoid clashing with other files
const adminUser = JSON.parse(localStorage.getItem("credentials"));
if (!adminUser || adminUser.role !== "admin") {
  window.location.href = "../index.html";
}

// 2. (Removed the console.log(book) that was here, as it would cause a ReferenceError)

window.onload = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let editISBN = urlParams.get("edit");

  if (editISBN) {
    const booksData = localStorage.getItem("books");

    if (booksData) {
      const books = JSON.parse(booksData);
      const book = books.find((b) => b.ISBN === editISBN);

      if (book) {
        document.getElementById("Title").value = book.Title;
        document.getElementById("Author").value = book.Author;
        document.getElementById("ISBN").value = book.ISBN;
        document.getElementById("Publisher").value = book.Publisher;
        document.getElementById("Publication-Year").value =
          book.Publication_Year;
        document.getElementById("Language").value = book.Language;
        document.getElementById("Category").value = book.Category;
        document.getElementById("Description").value = book.Description;
        document.getElementById("Call-Number").value = book.Call_Number;
        document.getElementById("Total-Copies").value = book.Total_Copies;
        document.getElementById("Edition").value = book.Edition;

        document.getElementById("ISBN").readOnly = true;

        let fileInput = document.getElementById("Cover-Image");
        if (fileInput) {
          fileInput.removeAttribute("required");
        }

        document.querySelector("h1").innerText = "Edit Book: " + book.Title;
      } else {
        console.error("Book not found in the array.");
      }
    }
  }
};

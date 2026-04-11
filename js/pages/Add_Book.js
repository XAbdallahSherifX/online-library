document.querySelector("form").onsubmit = (e) => {
    e.preventDefault();

    let booksArray = JSON.parse(localStorage.getItem("books")) || [];

    let book = {
        Title: document.getElementById("Title").value, 
        Author: document.getElementById("Author").value,
        ISBN: document.getElementById("ISBN").value,
        Publisher: document.getElementById("Publisher").value,
        Publication_Year: document.getElementById("Publication-Year").value,
        Language: document.getElementById("Language").value,
        Category: document.getElementById("Category").value,
        Description: document.getElementById("Description").value,
        Call_Number: document.getElementById("Call-Number").value,
        Total_Copies: document.getElementById("Total-Copies").value,
        Cover_Image: document.getElementById("Cover-Image").value,
        Edition: document.getElementById("Edition").value,
        Is_Available: true,
        Borrowed: 0
    };
    book.Is_Available = book.Total_Copies > 0 ? true:false;
    let isValid = true;
    const errorSummary = document.getElementById('errorSummary');
    errorSummary.innerHTML = "";
    document.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('input-error'));

    function addError(message, inputId) {
        const errorItem = document.createElement('p');
        errorItem.textContent = "- " + message;
        errorSummary.appendChild(errorItem);
        document.getElementById(inputId).classList.add('input-error');
        isValid = false;
    }

    const isEditMode = document.getElementById("ISBN").readOnly;

    if (!isEditMode) {
        const isDuplicate = booksArray.some(existingBook => existingBook.ISBN === book.ISBN);
        if (isDuplicate) {
            addError("A book with this ISBN already exists.", "ISBN");
        }
    }

    if (book.Title == "") addError("Title is required.", "Title"); 
    if (book.Author.trim() == "") addError("Author name is required.", "Author");
    if (book.ISBN.length < 1) addError("ISBN must be at least 1 digits.", "ISBN");
    if (book.Publisher == "") addError("Publisher name is required.", "Publisher");
    if (book.Publication_Year === "") addError("Select a Publication Year.", "Publication-Year");
    if (book.Language == "") addError("Select a Language.", "Language");
    if (book.Category == "" || book.Category === "select") addError("Select a valid Category.", "Category");
    if (book.Description == "") addError("Description cannot be empty.", "Description");
    if (book.Call_Number.length < 2) addError("Call Number must be 2-3 characters.", "Call-Number");
    if (book.Total_Copies == "" || book.Total_Copies < 0) addError("Total Copies must be 0 or more.", "Total-Copies");
    if (book.Cover_Image == "" && !isEditMode) addError("Upload a Cover Image.", "Cover-Image");
    if (book.Edition == "") addError("Edition details are required.", "Edition");

    if (isValid) {
        const existingIndex = booksArray.findIndex(b => b.ISBN === book.ISBN);

        if (existingIndex !== -1) {
            book.Borrowed = booksArray[existingIndex].Borrowed;
            if (book.Cover_Image === "") {
                book.Cover_Image = booksArray[existingIndex].Cover_Image;
            }
            booksArray[existingIndex] = book;
            alert("Book updated successfully!");
        } else {
            booksArray.push(book);
            alert("Book added successfully!");
        }

        localStorage.setItem("books", JSON.stringify(booksArray));
        window.location.href = "admin_dashboard.html";
    }
}
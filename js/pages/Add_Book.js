document.querySelector("form").onsubmit = (e) => {
    let book = {
        Titel: document.getElementById("Title").value,
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
        Borrowed: 0
    };

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

    if (book.Titel == "") addError("Title is required.", "Title");
    
    if (book.Author.trim() == "") addError("Author name is required.", "Author");

    if (book.ISBN.length < 10) addError("ISBN must be at least 10 digits.", "ISBN");

    if (book.Publisher == "") addError("Publisher name is required.", "Publisher");

    if (book.Publication_Year === "") addError("Please select a Publication Year.", "Publication-Year");

    if (book.Language == "") addError("Please select a Language.", "Language");

    if (book.Category == "" || book.Category === "select") addError("Please select a valid Category.", "Category");

    if (book.Description == "") addError("Description cannot be empty.", "Description");

    if (book.Call_Number.length < 2) addError("Call Number must be 2-3 characters.", "Call-Number");

    if (book.Total_Copies == "" || book.Total_Copies < 1) addError("Total Copies must be 1 or more.", "Total-Copies");

    if (book.Cover_Image == "") addError("Please upload a Cover Image.", "Cover-Image");

    if (book.Edition == "") addError("Edition details are required.", "Edition");

    if (!isValid) {
        e.preventDefault();
       
    } else {
        localStorage.setItem("Book" + book.ISBN, JSON.stringify(book));
        alert("Book added successfully!");
    }
}
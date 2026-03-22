document.querySelector("form").onsubmit = () =>{

let book = {
    Titel: document.getElementById("Title").value,
    Author:document.getElementById("Author").value,
    ISBN:document.getElementById("ISBN").value,
    Publisher:document.getElementById("Publisher").value,
    Publication_Year:document.getElementById("Publication-Year").value,
    Language:document.getElementById("Language").value,
    Category:document.getElementById("Category").value,
    Description:document.getElementById("Description").value,
    Call_Number:document.getElementById("Call-Number").value,
    Total_Copies:document.getElementById("Total-Copies").value,
    Cover_Image:document.getElementById("Cover-Image").value,
    Edition:document.getElementById("Edition").value,
    sold:0

}
localStorage.setItem("Book"+book.ISBN,JSON.stringify(book));

}
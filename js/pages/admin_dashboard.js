window.onload = ()=>{
    const tableBody = document.querySelector("#Book-Inventory tbody");
    for(let i = 0;i<localStorage.length;i++)
    {
    let key = localStorage.key(i);
    let data = localStorage.getItem(key);
    let book = JSON.parse(data);
    if(book){
    let row = document.createElement("tr");

    let ISBN = document.createElement("td");
    ISBN.innerText = book.ISBN;

    let titel = document.createElement("td");
    titel.innerText = book.Titel;

    let author = document.createElement("td");
    author.innerText = book.Author;

    let status = document.createElement("td");
    status.innerText = (book.Total_Copies == 0) ? "UnAvailable" : "Available";

    row.appendChild(ISBN);
    row.appendChild(titel);
    row.appendChild(author);
    row.appendChild(status);

    tableBody.appendChild(row);
    }
    }      
}
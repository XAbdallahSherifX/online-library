window.onload = () => {
    const tableBody = document.querySelector("#Book-Inventory tbody");
    let Total_Copies = 0;
    let borrowed_books = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        let book = JSON.parse(data);
        if (book) {
            Total_Copies += Number.parseInt(book.Total_Copies);
            borrowed_books += Number.parseInt(book.Borrowed);
            tableBody.appendChild(create_row(book));

        }

    }
    
    document.getElementById("Total-Books").innerText = Total_Copies;
    document.getElementById("borrowed-books").innerText = borrowed_books;
    document.getElementById("Available-Books").innerText = Total_Copies - borrowed_books;


    let search = document.getElementById("search");
    search.oninput = (e) => {
        let value = e.target.value.toLowerCase();
        tableBody.innerHTML = "";


        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let data = localStorage.getItem(key);
            let book = JSON.parse(data);

            if (book.Titel.toLowerCase().includes(value) || book.ISBN.toString().includes(value)|| book.Author.toLowerCase().includes(value)) {
                tableBody.appendChild(create_row(book));
            }
        }
    };


    function create_row(Book) {
        let row = document.createElement("tr");

        let ISBN = document.createElement("td");
        ISBN.innerText = Book.ISBN;

        let titel = document.createElement("td");
        titel.innerText = Book.Titel;

        let author = document.createElement("td");
        author.innerText = Book.Author;

        let status = document.createElement("td");
        status.innerText = (Book.Total_Copies == 0) ? "UnAvailable" : "Available";
        let action = document.createElement("td");

        let edit = document.createElement("input");
        edit.type = "button";
        edit.value = "Edit";

        let delet = document.createElement("input");
        delet.type = "button";
        delet.value = "Delete";
        action.appendChild(edit);
        action.appendChild(delet);


        row.appendChild(ISBN);
        row.appendChild(titel);
        row.appendChild(author);
        row.appendChild(status);
        row.appendChild(action);


        delet.onclick = () => {
            delet.parentElement.parentElement.remove();
            localStorage.removeItem("Book" + Book.ISBN)
        }


        edit.onclick = () => {
            window.location.href = `bookform.html?edit=${Book.ISBN}`;
        };
        return row;

    }
}


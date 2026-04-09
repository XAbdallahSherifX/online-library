window.onload = () => {
    const tableBody = document.querySelector("#Book-Inventory tbody");
    
   
    let books = JSON.parse(localStorage.getItem("books")) || [];

    
    function updateStats(bookList) {
        let total = 0;
        let borrowed = 0;
        
        bookList.forEach(book => {
            total += Number(book.Total_Copies || 0);
            borrowed += Number(book.Borrowed || 0);
        });

        document.getElementById("Total-Books").innerText = total;
        document.getElementById("borrowed-books").innerText = borrowed;
        document.getElementById("Available-Books").innerText = total - borrowed;
    }

    
    function renderTable(bookList) {
        tableBody.innerHTML = ""; // Clear current rows
        bookList.forEach(book => {
            tableBody.appendChild(create_row(book));
        });
    }

    
    renderTable(books);
    updateStats(books);

    
    let search = document.getElementById("search");
    search.oninput = (e) => {
        let value = e.target.value.toLowerCase();
        
        let filteredBooks = books.filter(book => 
            book.Titel.toLowerCase().includes(value) || 
            book.ISBN.toString().includes(value) || 
            book.Author.toLowerCase().includes(value)
        );

        renderTable(filteredBooks);
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
        status.innerText = (Book.Total_Copies <= 0) ? "Unavailable" : "Available";
        
        let action = document.createElement("td");

        // --- Edit Icon ---
        let editIcon = document.createElement("i");
        editIcon.className = "fa-solid fa-pen-to-square action-icon edit-btn";
        editIcon.title = "Edit Book";
        editIcon.style.cursor = "pointer";
        editIcon.onclick = () => {
            window.location.href = `bookform.html?edit=${Book.ISBN}`;
        };

       
        let trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash";
        trashIcon.style.color = "rgb(222, 13, 13)";
        trashIcon.style.cursor = "pointer";
        trashIcon.style.marginLeft = "15px";
        trashIcon.onclick = function () {
            if (confirm(`Delete "${Book.Titel}"?`)) {
                
                let updatedBooks = books.filter(b => b.ISBN !== Book.ISBN);
                
                
                localStorage.setItem("books", JSON.stringify(updatedBooks));
                
                
                location.reload();
            }
        };

        action.appendChild(editIcon);
        action.appendChild(trashIcon);

        row.appendChild(ISBN);
        row.appendChild(titel);
        row.appendChild(author);
        row.appendChild(status);
        row.appendChild(action);

        return row;
    }
}
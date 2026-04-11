window.onload = () => {
    const tableBody = document.querySelector("#inventory-body");
    
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
        tableBody.innerHTML = ""; 
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
        
            book.Title.toLowerCase().includes(value) || 
            book.ISBN.toString().includes(value) || 
            book.Author.toLowerCase().includes(value)
        );

        renderTable(filteredBooks);
    };

    function create_row(Book) {
        let row = document.createElement("div");
        row.className = "table-row";

        let ISBN = document.createElement("div");
        ISBN.className = "table-cell";
        ISBN.setAttribute("data-label", "ISBN");
        ISBN.innerText = Book.ISBN;

        let title = document.createElement("div");
        title.className = "table-cell";
        title.setAttribute("data-label", "Book Title");
        title.innerText = Book.Title; 

        let author = document.createElement("div");
        author.className = "table-cell";
        author.setAttribute("data-label", "Author");
        author.innerText = Book.Author;

        let status = document.createElement("div");
        status.className = "table-cell";
        status.setAttribute("data-label", "Status");
        status.innerText = (!Book.Is_Available) ? "Unavailable" : "Available";
        
        let action = document.createElement("div");
        action.className = "table-cell action-cell";

        let editIcon = document.createElement("i");
        editIcon.className = "fa-solid fa-pen-to-square action-icon edit-btn";
        editIcon.title = "Edit Book";
        editIcon.style.cursor = "pointer";
        editIcon.onclick = () => {
            window.location.href = `bookform.html?edit=${Book.ISBN}`;
        };

        let trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash action-icon";
        trashIcon.style.color = "var(--color-status-error-text, rgb(222, 13, 13))";
        trashIcon.style.cursor = "pointer";
        trashIcon.style.marginLeft = "15px";
        trashIcon.onclick = function () {
            if (confirm(`Delete "${Book.Title}"?`)) { 
                let updatedBooks = books.filter(b => b.ISBN !== Book.ISBN);
                localStorage.setItem("books", JSON.stringify(updatedBooks));
                location.reload();
            }
        };

        action.appendChild(editIcon);
        action.appendChild(trashIcon);

        row.appendChild(ISBN);
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(status);
        row.appendChild(action);

        return row;
    }
}
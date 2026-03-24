window.onload = () => {
    const tableBody = document.querySelector("#Book-Inventory tbody");
    let Total_Copies =0;
    let out_of_stock = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
        let book = JSON.parse(data);
        if (book) {
            Total_Copies += Number.parseInt(book.Total_Copies);
            out_of_stock += Number.parseInt(book.sold);
            let row = document.createElement("tr");

            let ISBN = document.createElement("td");
            ISBN.innerText = book.ISBN;

            let titel = document.createElement("td");
            titel.innerText = book.Titel;

            let author = document.createElement("td");
            author.innerText = book.Author;

            let status = document.createElement("td");
            status.innerText = (book.Total_Copies == 0) ? "UnAvailable" : "Available";
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

            tableBody.appendChild(row);
            delet.onclick = () => {
                delet.parentElement.parentElement.remove();
                localStorage.removeItem("Book" + book.ISBN)
            }


            edit.onclick = () => {
                window.location.href = `bookform.html?edit=${book.ISBN}`;
            };

        }

    }
    document.getElementById("Total-Books").innerText = Total_Copies;
    document.getElementById("Books-Out-of-stock").innerText = out_of_stock;
    document.getElementById("Available-Books").innerText =Total_Copies - out_of_stock;

}


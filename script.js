// Initializing table
const myLibrary = [];

// defining variables, collecting DOM elements
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show");
const cancelButton = document.getElementById('cancelButton');
const bookForm = document.getElementById('bookForm');


// defining functions for managing the library
//
// book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'read' : 'not read yet';

    this.info = function() {
        return (this.title+' by ' + this.author + ', '  + this.pages + 
            ' pages, ' + this.read)
    }
}



// functions and scripts for interactions with library

// adding book to libraray array
function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

// "NEW BOOK" button opens the dialog modally
showButton.addEventListener('click', () => {
    dialog.showModal();
});

// Adding new book to table by adding another row
function addBookToTable(book) {
    const newRow = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdPages = document.createElement("td");
    const tdRead = document.createElement("td");

    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;
    tdPages.textContent = book.pages;
    tdRead.textContent = book.read;

    newRow.appendChild(tdTitle);
    newRow.appendChild(tdAuthor);
    newRow.appendChild(tdPages);
    newRow.appendChild(tdRead);
    
    const table = document.querySelector(".target table");
    table.appendChild(newRow);
}

cancelButton.addEventListener('click', function () {
    dialog.close();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
bookForm.addEventListener('submit', (event) => {   
    event.preventDefault(); // Prevents standard submit
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value === 'yes';

    // Add book to library
    const newBook = new Book(title, author, pages, read);

    // add book to library
    addBookToLibrary(newBook);

    // add book to table; Add new row in table
    addBookToTable(newBook);

    // close dialog after adding book
    dialog.close();
});
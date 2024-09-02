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

    // Create a new card element
    const card = document.createElement('div');
    card.className = 'card';

    // Set the card's inner HTML
    card.innerHTML = `
        <h1 class="title">${title}</h1>
        <div class="author">by ${author}</div>
        <div class="pages">Pages: ${pages}</div>
        <div class="card-buttons">
        <label class="switch">
            <input type="checkbox" ${read ? 'checked' : ''}>
            <span class="slider round"></span>
        </label>
        <button type="button" onclick="this.parentElement.remove()">Delete</button>
        </div>
    `;

    // Append the card to the container
    document.querySelector('.container').appendChild(card);

    // close dialog after adding book
    dialog.close();
});
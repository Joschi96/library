// Initializing table
const myLibrary = [];

let book1 = new Book('How to rule the world!','John Smith','4586',true)
let book2 = new Book('Save the whales!','John Smithidysmith','9',false)
let book3 = new Book('Introduction to waterwalking - Everybody can do it!','Johnathan Smith','1478',true)
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

document.addEventListener("DOMContentLoaded", function(){
    loadLibrary(myLibrary);
    document.querySelector('.container').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            deleteBook(event.target);
        }
    });
});

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

function loadLibrary(library) {
    // console.log(library)
    library.forEach((book, index) => {
        // Create a new card element
        const card = document.createElement('div');
        card.className = 'card';
    
        // Set the card's inner HTML
        card.innerHTML = `
            <h1 class="title">${book.title}</h1>
            <div class="card-flex">
                <div class="author">by: ${book.author}</div>
                <div class="pages">Pages: ${book.pages}</div>
            </div>
            <div class="card-buttons">
                <label class="switch">
                    <input type="checkbox" ${book.read ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
                <button class="delete-button" type="button" data-index="${index}">Delete</button>
            </div>
        `;
    
        // Append the card to the container
        document.querySelector('.container').appendChild(card);
    });
}


// "NEW BOOK" button opens the dialog modally
showButton.addEventListener('click', () => {
    dialog.showModal();
});

cancelButton.addEventListener('click', function () {
    dialog.close();
});

// Submit eventlistener to add book to array and create card on screen
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
    <h1 class="title">${newBook.title}</h1>
        <div class="card-flex">
            <div class="author">by: ${newBook.author}</div>
            <div class="pages">Pages: ${newBook.pages}</div>
        </div>
        <div class="card-buttons">
            <label class="switch">
                <input type="checkbox" ${newBook.read ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
            <button class="delete-button" type="button" data-index="${index}">Delete</button>
        </div>
    `;

    // Append the card to the container
    document.querySelector('.container').appendChild(card);

    // close dialog after adding book
    dialog.close();
});

const deleteBtn = document.querySelector('.delete-button');

function deleteBook(deleteBtn) {
    const bookIndex = deleteBtn.getAttribute('data-index'); // Index des zu löschenden Buchs
    myLibrary.splice(bookIndex, 1); // Buch aus myLibrary-Array entfernen

    // Alle Karten aktualisieren
    document.querySelector('.container').innerHTML = '';
    loadLibrary(myLibrary); // Bibliothek erneut laden, um die Änderungen anzuzeigen
}
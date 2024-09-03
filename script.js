// Initialize the library array
const myLibrary = [];

// Create initial books
let book1 = new Book('How to rule the world!', 'John Smith', '4586', true);
let book2 = new Book('Save the whales!', 'John Smithidysmith', '9', false);
let book3 = new Book('Introduction to waterwalking - Everybody can do it!', 'Johnathan Smith', '1478', true);

// Add initial books to the library
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

// Load library and setup event listeners when DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    loadLibrary(myLibrary);

    // Use event delegation to handle delete button clicks and toggle switches efficiently
    document.querySelector('.container').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            deleteBook(event.target);
        }
    });

    // Handle toggle switch changes to update the read status
    document.querySelector('.container').addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            toggleReadStatus(event.target);
        }
    });
});

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'read' : 'not read yet';
}

// Add a book to the library array
function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

// Function to load all books from the library array and create cards for them
function loadLibrary(library) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear existing content to avoid duplicates

    library.forEach((book, index) => {
        const card = createBookCard(book, index);
        container.appendChild(card);
    });
}

// Function to create a book card element
function createBookCard(book, index) {
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
                <input type="checkbox" ${book.read === 'read' ? 'checked' : ''} data-index="${index}">
                <span class="slider round"></span>
            </label>
            <button class="delete-button" type="button" data-index="${index}">Delete</button>
        </div>
    `;
    return card;
}

// Function to delete a book from the library
function deleteBook(deleteBtn) {
    const bookIndex = deleteBtn.getAttribute('data-index'); // Get the index of the book to delete
    myLibrary.splice(bookIndex, 1); // Remove the book from the library array

    loadLibrary(myLibrary); // Reload the library to reflect changes
}

// Function to toggle the read status of a book
function toggleReadStatus(checkbox) {
    const bookIndex = checkbox.getAttribute('data-index'); // Get the index of the book to update
    const book = myLibrary[bookIndex];

    // Update the read status based on the checkbox state
    book.read = checkbox.checked ? 'read' : 'not read yet';
    console.log(book);
    loadLibrary(myLibrary); // Reload the library to reflect changes
}

// "New Book" button opens the dialog modally
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show");
const cancelButton = document.getElementById('cancelButton');
const bookForm = document.getElementById('bookForm');

showButton.addEventListener('click', () => dialog.showModal());
cancelButton.addEventListener('click', () => dialog.close());

// Handle form submission to add a new book
bookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve values from the form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value === 'yes';

    // Create a new book and add it to the library
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Update the library display with the new book
    loadLibrary(myLibrary);

    dialog.close(); // Close the dialog after adding the book
});

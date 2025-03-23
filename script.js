// Initialize the library array
const myLibrary = [];

// Define the Book class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read ? 'read' : 'not read yet';
    }

    toggleReadStatus() {
        this.read = this.read === 'read' ? 'not read yet' : 'read';
    }
}

// Define the Library class
class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
        this.loadLibrary();
    }

    deleteBook(index) {
        this.books.splice(index, 1);
        this.loadLibrary();
    }

    toggleReadStatus(index) {
        this.books[index].toggleReadStatus();
        this.loadLibrary();
    }

    loadLibrary() {
        const container = document.querySelector('.container');
        container.innerHTML = ''; // Clear existing content to avoid duplicates

        this.books.forEach((book, index) => {
            const card = this.createBookCard(book, index);
            container.appendChild(card);
        });
    }

    createBookCard(book, index) {
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
}

// Initialize library instance
const library = new Library();

// Create initial books and add them to the library
library.addBook(new Book('How to rule the world!', 'John Smith', '4586', true));
library.addBook(new Book('Save the whales!', 'John Smithidysmith', '9', false));
library.addBook(new Book('Introduction to waterwalking - Everybody can do it!', 'Johnathan Smith', '1478', true));

// Load library and setup event listeners when DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    library.loadLibrary();

    // Use event delegation to handle delete button clicks and toggle switches efficiently
    document.querySelector('.container').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const bookIndex = event.target.getAttribute('data-index');
            library.deleteBook(bookIndex);
        }
    });

    // Handle toggle switch changes to update the read status
    document.querySelector('.container').addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            const bookIndex = event.target.getAttribute('data-index');
            library.toggleReadStatus(bookIndex);
        }
    });
});

// "New Book" button opens the dialog modally
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show");
const cancelButton = document.getElementById('cancelButton');
const bookForm = document.getElementById('bookForm');
const title = document.getElementById('title').value;

showButton.addEventListener('click', () => dialog.showModal());
cancelButton.addEventListener('click', () => dialog.close());


// Handle form submission to add a new book
bookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve values from the form
    const titleInput = document.getElementById('title');
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readSelect = document.getElementById('read');
    const read = readSelect.value === 'yes';

    const titleError = document.querySelector("#title + span.error");
    const readError = document.querySelector("#read + span.error");

    let isValid = true;

    // Validate title input
    if (!titleInput.value.trim()) {
        titleError.textContent = 'Title is required.';
        titleError.className = "error active";
        isValid = false;
    } else {
        titleError.textContent = '';
        titleError.className = "error";
    }

    // Validate read select
    if (!readSelect.value) {
        readError.textContent = 'Please select a read status.';
        readError.className = "error active";
        isValid = false;
    } else {
        readError.textContent = '';
        readError.className = "error";
    }

    // If the form is valid, create a new book and add it to the library
    if (isValid) {
        const newBook = new Book(titleInput.value.trim(), author, pages, read);
        library.addBook(newBook);

        dialog.close(); // Close the dialog after adding the book
    }
});

// Add input event listener to clear the title error dynamically
document.getElementById('title').addEventListener('input', () => {
    const titleInput = document.getElementById('title'); // Retrieve the element again
    const titleError = document.querySelector("#title + span.error");
    if (titleInput.value.trim()) {
        titleError.textContent = '';
        titleError.className = "error";
    }
});

// Add change event listener to clear the read error dynamically
document.getElementById('read').addEventListener('change', () => {
    const readSelect = document.getElementById('read'); // Retrieve the element again
    const readError = document.querySelector("#read + span.error");
    if (readSelect.value) {
        readError.textContent = '';
        readError.className = "error";
    }
});

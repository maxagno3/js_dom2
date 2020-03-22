//Selecting the tags by their tag name, class or id.
let input = document.querySelector('input[id="addBook"]');
let button = document.querySelector("button");
let ul = document.querySelector("ul");
let checkbox = document.querySelector("#hide");
let hideBook = document.querySelector('.add');
let search = document.querySelector(".search");

let arr = [];

//From where the object is being into the array.
function addingBooks(event) {
    event.preventDefault();
    let books = {
        title: input.value,
        id: Date.now()
    }
    arr.push(books);
    addBooks(arr);
}

//Main function from where name of books will be added to the list.
function addBooks(arr) {
    ul.innerHTML = '';
    arr.forEach(listBooks => {
        let li = document.createElement("li");
        li.setAttribute("data-id", listBooks.id);

        //Creating heading.
        let bookName = document.createElement("h1");
        bookName.setAttribute("data-id", listBooks.id);
        bookName.innerHTML = listBooks.title;

        //Creating delete button.
        let delButton = document.createElement("button");
        delButton.innerText = "Delete";
        delButton.setAttribute("data-id", listBooks.id);
        delButton.addEventListener("click", delBooks);

        //Appending it so that it's shown on the screen.
        li.append(bookName, delButton);
        ul.append(li);
        console.log(ul);
    })
    hideBook.value = "";
}

//Hide Books
function checkHide() {
    if (ul.style.display === "none") {
        ul.style.display = "block";
    } else {
        ul.style.display = "none";
    }
    addBooks(arr);
}

//Delete Books.
function delBooks() {
    arr = arr.filter(del => !(event.target.dataset.id == del.id));
    addBooks(arr);
}

// Search Books.
function searchBooks(event) {
    event.preventDefault();
    let newArr = arr.filter(bookSearch => bookSearch.title.includes(event.target.value));

    addBooks(newArr);
}

//Event listeners.
button.addEventListener("click", addingBooks);
checkbox.addEventListener("click", checkHide);
search.addEventListener("keyup", searchBooks);
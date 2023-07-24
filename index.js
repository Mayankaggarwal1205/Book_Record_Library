console.log('Welcome to index js');

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {
    
}

let tableData = localStorage.getItem('tableData');
let inputData;
if(tableData == null) {
    inputData = Display.add(book);
} else{
    inputData = tableData;
}

// add methods to display prototype
Display.prototype.add = function (book) {
    // console.log('added') 
    let tableBody = document.getElementById('tableBody');
    let uiString = `
                    <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
    tableBody.innerHTML += uiString;
};
Display.prototype.clear = function () {
    let libaryForm = document.getElementById('libraryForm');
    libaryForm.reset();
};

Display.prototype.validate = function(book) {
    if(book.name.length<4 || book.author.length<4) {
        return false;
    } else{
        return true;
    }
}


Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);

}


// add submit event listener to libraryForm 
let libaryForm = document.getElementById('libraryForm');

libaryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }
     let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success' , 'Your book has been added successfully');
    } else {
        display.show('danger' , "Sorry, your book can't be added");
    }

   localStorage.setItem('tableData' , 'display');

    e.preventDefault();
    console.log('You have sumbitted successfully');
}

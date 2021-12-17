getBookForFun()
getAuthor()
getStatus()
getCategory()

function getBookForFun() {
    $.ajax({
        url: "http://localhost:8080/books/list",
        type: "GET",
        success: function (data) {
            let content = ``
            for (let i = 0; i < data.length; i++) {
                content += getBook(data[i]);
            }

            document.getElementById("tbodyId").innerHTML = content;
        }
    })
}

function getBook(book) {
    let category = "<td>";
    for (let i = 0; i < book.categoryList.length; i++) {
        category += `${book.categoryList[i].category}` + ` `
    }
    category += "</td>"
    let image = "/image/" + book.image;
    return `<tr></tr><td>` +
        `<span class="custom-checkbox">` +
        `<input type="checkbox" id="checkbox1" name="options[]" value="1">` +
        `<label htmlFor="checkbox1"></label>` +
        `</span>` +
        `</td>` +
        ` <td>${book.name}</td>` +
        ` <td>${book.author.authorName}</td>` +
        `<td>${book.quantity}</td>` +
        `<td>${book.bookStatus.status}</td>` +
        `<td><img src="${image}"></td>` +
        `<td>${book.description}</td>` +
        category +
        `<td>` +
        `<a href="#editBookModal" class="edit" data-toggle="modal"><i class="material-icons"` +
        `data-toggle="tooltip"` +
        `title="Edit">&#xE254;</i></a>` +
        `<a href="#deleteBookModal" class="delete" data-toggle="modal"><i class="material-icons"` +
        `data-toggle="tooltip"` +
        `title="Delete">&#xE872;</i></a>` +
        `</td></tr>`
}

function getAuthor() {
    $.ajax({
        url: "http://localhost:8080/author/list",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].authorName}</option>`
            }
            document.getElementById("author").innerHTML = content;
        }
    })
}

function getStatus() {
    $.ajax({
        url: "http://localhost:8080/bookStatus/list",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].status}</option>`
            }
            document.getElementById("status").innerHTML = content;
        }
    })
}

function getCategory() {
    $.ajax({
        url: "http://localhost:8080/categories/showAll",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                // content+= `<option value="${data.id}">${data.category}</option>`
                content += `<input type="checkbox" id="category" value="">
                            <label htmlFor="category"> ${data[i].category}</label><br>`
            }
            document.getElementById("category").innerHTML = content;
        }
    })
}

function createBook() {
    let name = $("#name").val();
    let author = $("#author").val();
    let quantity = $("#quantity").val();
    let status = $("#status").val();
    let image = $("#image")[0].files[0];
    let description = $("#description").val();
    let category = $("#category").val();
    let formData = new FormData;
    formData.append("file", image);
    let book = {
        name: name,
        quantity: quantity,
        author: {
            id: author
        },
        status: {
            id: status
        },
        description: description,
        category: [
            {
                id: category
            }
        ]
    }
    $.ajax({
        type:"POST",
        url: "http://localhost:8080/books/create",
        data: JSON.stringify(book),
        success:getBookForFun()
    });
}

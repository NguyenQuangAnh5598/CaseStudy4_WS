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
        `<td><img src="./image/${book.image}" height="100px" width="80px"></td>` +
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

function getAuthor(id,authorId) {
    $.ajax({
        url: "http://localhost:8080/author/list",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                if(data[i].id===authorId){
                    content+=`<option selected value="${data[i].id}">${data[i].authorName}</option>`
                }else{
                    content += `<option value="${data[i].id}">${data[i].authorName}</option>`
                }
            }
            document.getElementById("author").innerHTML = content;
        }
    })
}

function getStatus(id,statusId) {
    $.ajax({
        url: "http://localhost:8080/bookStatus/list",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                if(data[i].id===statusId){
                    content += `<option value="${data[i].id}">${data[i].status}</option>`
                }else{
                    content += `<option value="${data[i].id}">${data[i].status}</option>`
                }
            }
            document.getElementById("status").innerHTML = content;

        }
    })
}

function getCategory(id,categoryId) {
    $.ajax({
        url: "http://localhost:8080/categories/showAll",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
               if(data[i].id===categoryId){
                   content += `<option id="category" value="${data[i].id}">${data[i].category}</option>`
               }else{
                   content += `<option id="category" value="${data[i].id}">${data[i].category}</option>`
               }

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
    let categoryID = $("#category").val();
    let category = [];
    for (let i = 0; i < categoryID.length; i++) {
        category[i] = {id: categoryID[i]}
    }
    let formData = new FormData;
    formData.append("file", image);
    let book = {
        name: name,
        quantity: quantity,
        author: {
            id: author
        },
        bookStatus: {
            id: status
        },
        description: description,
        categoryList: category
    }
    formData.append("book",JSON.stringify(book))
    $.ajax({
        type:"POST",
        url: "http://localhost:8080/books/create",
        data: formData,
        headers:{'Content-Type':undefined},
        contentType: false,
        processData: false,
        success:getBookForFun()
    });
}
function editBook(){
    let name=$("#editName").val();
    let author=$("#editAuthor").val();
    let quantity=$("#editQuantity").val();
    let status=$("#editStatus").val();
    let image=$("#editImage")[0].files[0];
    let description=$("#editDescription").val();
    let categoryID=$("#editCategory").val();
    let category=[];
    for (let i = 0; i < categoryID.length; i++) {
        category[i] = {id: categoryID[i]}
    }
    let formData = new FormData;
    formData.append("file", image);
    let book = {
        name: name,
        quantity: quantity,
        author: {
            id: author
        },
        bookStatus: {
            id: status
        },
        description: description,
        categoryList: category
    }
    formData.append("book",JSON.stringify(book))
    $.ajax({
        type:"PUT",
        data: formData,
        url: "http://localhost:8080/books/update",
        success:getBookForFun()
    })
}
function editForm(a){
    let id=a.getAttribute("id");
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/books/find/"+ id,
        headers: {
            "Accept":"application/json",
            "Content-type":"application/json"
        },
        success: function (data){

        }
    })
}
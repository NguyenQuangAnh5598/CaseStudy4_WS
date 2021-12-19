getBookForFun()
getAuthor("author")
getStatus("status")
getCategory("category")

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
        `<a href="#deleteBookModal" onclick="getFormDelete(this)" id="${book.id}" class="delete" data-toggle="modal"><i class="material-icons"` +
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
            document.getElementById(id).innerHTML = content;
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
            document.getElementById(id).innerHTML = content;

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
            document.getElementById(id).innerHTML = content;
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
function form(data){
    let content=`<div class="modal-content">
            <form>
                <div class="modal-header">
                <h4 class="modal-title">Edit Book</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Name</label>
                        <input id="editName" type="text" class="form-control" value="${data.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Author</label>
                        <select id="editAuthor" >

                        </select>
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input id="editQuantity" type="number" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select id="editStatus">

                        </select>
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input id="editImage" type="file" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input id="editDescription" type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="editCategory" multiple >

                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                    <input type="submit" class="btn btn-success" value="Add" onclick="createBook()">
                </div>
            </form>
        </div>`
}
function getFormDelete(a){
    let id = a.getAttribute("id");
    let content = `<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">`+
        `<input type="submit" href="` +id+ `" onclick="deleteCustomer(this)" class="btn btn-danger" value="Delete">`
    document.getElementById('delete').innerHTML = content;
}
function deleteCustomer(a){
    let id = a.getAttribute("href");
    $.ajax({
        type:"DELETE",
        url:'http://localhost:8080/books/delete/' + id,
        success:getBookForFun
    })
    $('#deleteBookModal').modal('hide');
    event.preventDefault();
}

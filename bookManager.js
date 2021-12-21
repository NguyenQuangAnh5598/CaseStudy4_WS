let customer=JSON.parse(localStorage.getItem("customer"))

getBookForFun()
getAuthor("author")
getStatus("status")
getCategoryAdd()
function getBookForFun() {
    $.ajax({
        headers:{
            'Authorization': 'Bearer '+ customer.accessToken
        },
        url: "http://localhost:8080/books",
        type: "GET",
        success: function (data) {
            let content = ``
            for (let i = 0; i < data.content.length; i++) {
                content += getBook(data.content[i]);
            }
            document.getElementById("tbodyId").innerHTML = content;
            document.getElementById("page").innerHTML = getPage(data);
            document.getElementById("item").innerText = data.totalElements + ' item';
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
        `<td>${book.name}</td>` +
        `<td>${book.author.authorName}</td>` +
        `<td>${book.quantity}</td>` +
        `<td>${book.bookStatus.status}</td>` +
        `<td><img src="./image/${book.image}" height="100px" width="80px"></td>` +
        `<td>${book.description}</td>` +
        category +
        `<td>` +
        `<a href="#editBookModal" onclick="editForm(this)" id="${book.id}" class="edit" data-toggle="modal"><i class="material-icons"` +
        `data-toggle="tooltip"` +
        `title="Edit">&#xE254;</i></a>` +
        `<a href="#deleteBookModal" onclick="getFormDelete(this)" id="${book.id}" class="delete" data-toggle="modal"><i class="material-icons"` +
        `data-toggle="tooltip"` +
        `title="Delete">&#xE872;</i></a>` +
        `</td></tr>`
}

function getAuthor(id,authorId) {
    $.ajax({
        headers:{
            'Authorization': 'Bearer '+ customer.accessToken
        },
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
        headers:{
            'Authorization': 'Bearer '+ customer.accessToken
        },
        url: "http://localhost:8080/bookStatus/list",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                if(data[i].id===statusId){
                    content += `<option selected value="${data[i].id}">${data[i].status}</option>`
                }else{
                    content += `<option value="${data[i].id}">${data[i].status}</option>`
                }
            }
            document.getElementById(id).innerHTML = content;

        }
    })
}

function getCategoryEdit(categoryList) {
    $.ajax({
        headers:{
            'Authorization': 'Bearer '+ customer.accessToken
        },
        url: "http://localhost:8080/categories/showAll",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                let check = false;
                for (let j = 0; j < categoryList.length; j++) {
                    if (data[i].id == categoryList[j].id ){
                       check = true;
                    }
                }
                if (check){
                    content += `<option selected id="category" value="${data[i].id}">${data[i].category}</option>`
                }
                else {
                    content += `<option id="category" value="${data[i].id}">${data[i].category}</option>`
                }
            }
            document.getElementById('editcategory').innerHTML = content;
        }
    })
}
function getCategoryAdd() {
    $.ajax({
        headers:{
            'Authorization': 'Bearer '+ customer.accessToken
        },
        url: "http://localhost:8080/categories/showAll",
        type: "GET",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option id="category" value="${data[i].id}">${data[i].category}</option>`
            }
            document.getElementById('category').innerHTML = content;
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
        // headers:{'Content-Type':undefined},
        headers:{
            'Authorization': 'Bearer '+ customer.accessToken
        },
        contentType: false,
        processData: false,
        success:getBookForFun
    });
    $('#addBookModal').modal('hide');
    event.defaultPrevented
}
function editBook(){

    let id = $('#id').val();
    let name=$("#name2").val();
    let author=$("#editauthor").val();
    let quantity=$("#quantity2").val();
    let status=$("#editstatus").val();
    let img = $('#image2').val();
    let description=$("#editDescription").val();
    let categoryID=$("#editcategory").val();
    let category=[];
    for (let i = 0; i < categoryID.length; i++) {
        category[i] = {id: categoryID[i]}
    }
    let book = {
        id: id,
        name: name,
        quantity: quantity,
        author: {
            id: author
        },
        bookStatus: {
            id: status
        },
        image: img,
        description: description,
        categoryList: category
    }
    if ($("#file2").val() != ''){
        let image=$("#file2")[0].files[0];
        let formData = new FormData;
        formData.append("file", image);
        formData.append("book",JSON.stringify(book))
        $.ajax({
            type:"POST",
            url: "http://localhost:8080/books/create",
            data: formData,
            // headers:{'Content-Type':undefined},
            headers:{
                'Authorization': 'Bearer '+ customer.accessToken
            },
            contentType: false,
            processData: false,
            success:getBookForFun
        });

    }
    else {
        $.ajax({
            type:"PUT",
            url: "http://localhost:8080/books/update",
            data:JSON.stringify(book),
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': 'Bearer '+ customer.accessToken
            },
            success:getBookForFun
        })
    }
    $('#editBookModal').modal('hide');
    event.defaultPrevented

}
function editForm(a){
    let id=a.getAttribute("id");
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/books/find/"+ id,
        headers: {
            'Authorization': 'Bearer '+ customer.accessToken
        },
        success: function (data){
            let img = '/image/' + data.image;
            getAuthor('editauthor',data.author.id);
            getStatus('editstatus',data.bookStatus.id);
            getCategoryEdit(data.categoryList);
            document.getElementById('editID').innerHTML = `<input id="id" value="${data.id}" type="text" class="form-control" hidden>`;
            document.getElementById('editname').innerHTML = `<label>Name</label><input id="name2" value="${data.name}" type="text" class="form-control" required>`
            document.getElementById('editquantity').innerHTML = `<label>Quantity</label>
            <input id="quantity2" value="${data.quantity}" type="number" class="form-control" required>`
            document.getElementById('editimg').innerHTML = `<label>Image</label>` +
                `<img width="100" height="100" src="${img}" alt="Chưa có ảnh">`+
                `<input type="text"  value="${data.image}" hidden id="image2">`+
            `<input id="file2"  type="file" class="form-control" required>`
            document.getElementById('editDescription').defaultValue = data.description;

        }
    })
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
        headers: {
            'Authorization': 'Bearer '+ customer.accessToken
        },
        type:"DELETE",
        url:'http://localhost:8080/books/delete/' + id,
        success:getBookForFun
    })
    $('#deleteBookModal').modal('hide');
    event.preventDefault();
}
function getPage(page){
    let content = "";
    let count = 0;
    count = parseInt((page.number + 1)/5) * 5;
    if (page.number > 0){
        content+= `<li class="page-item "><a class="page-link" onclick="page(this)" id="${page.number -1}">Previous</a></li>`
    }
    for (let i = 1; i < 6; i++) {
        if (count + i <= page.totalPages){
            if (page.number == count + i -1){
                content += `<li class="page-item active"><a class="page-link">${count + i}</a></li>`
            }
            else {
                content += `<li class="page-item"><a onclick="page(this)" id="${count + i - 1}" class="page-link">${count + i}</a></li>`
            }
        }
    }
    if (page.number +1 < page.totalPages){
        content += `<li class="page-item"><a onclick="page(this)" id="${page.number + 1}" class="page-link">Next</a></li>`
    }
    return content;


}
function page(a){
    let page = a.getAttribute("id");
    $.ajax({
        headers: {
            'Authorization': 'Bearer '+ customer.accessToken
        },
        url: "http://localhost:8080/books?page=" + page,
        type: "GET",
        success: function (data) {
            let content = ``
            for (let i = 0; i < data.content.length; i++) {
                content += getBook(data.content[i]);
            }
            document.getElementById("tbodyId").innerHTML = content;
            document.getElementById("page").innerHTML = getPage(data);
        }
    })
}

getAllBook()
getCategory()
getAuthor()

function getAllBook(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/books",
        success:function (data){
            let content ="";
            for (let i = 0; i < data.content.length; i++) {
                content += getBook(data.content[i]);
            }
            document.getElementById('listBook').innerHTML = content;
            document.getElementById('page').innerHTML = getPage(data)

        }
    })
}
function getBook(book){
    let img = "/image/" + book.image;
    let content = `<div class="col-4">`+
        `<p onclick="getDetail(this)" id="${book.id}"><img src="${img}"></p>`+
        `<button onclick="borrow(this)" id="${book.id}">muon</button>`+
        `<h4>${book.name}</h4>`+
        `</div>`
    return content;
}
function getPage(page){
    let content = "";
    let count = 0;
    count = parseInt((page.number + 1)/5) * 5;
    if (page.number > 0){
        content+= `<span id="${page.number -1}" onclick="page(this)">&#8592;</span>`
    }
    for (let i = 1; i < 6; i++) {
        if (count + i <= page.totalPages){
            if (page.number == count + i -1){
                content += `<span style="color: #e5d1d1">${count + i}</span>`
            }
            else {
                content += `<span><a onclick="page(this)" id="${count + i - 1}">${count + i}</a></span>`
            }
        }
    }
    if (page.number +1 < page.totalPages){
        content += `<span><a onclick="page(this)" id="${page.number + 1}">&#8594;</a></span>`
    }
    return content;


}
function page(a){
    let url = '';
    let categoryID  = $('#category').val();
    let authorID = $('#author').val();
    let page = a.getAttribute("id");
    if (categoryID != 0){
        url = 'http://localhost:8080/books/list/category/' + categoryID + '?page=' + page;
    }else {
        if (authorID != 0){
            url = 'http://localhost:8080/books/list/author/' + authorID + '?page=' + page;
        } else{
            url = "http://localhost:8080/books?page=" + page;
        }
    }

    $.ajax({
        type:"GET",
        url:url,
        success:function (data){
            let content ="";
            for (let i = 0; i < data.content.length; i++) {
                content += getBook(data.content[i]);
            }
            document.getElementById('listBook').innerHTML = content;
            document.getElementById('page').innerHTML = getPage(data)
            $(window).scrollTop(0);
        }
    })
    event.defaultPrevented
}
function getCategory(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/categories/showAll",
        success:function (data){
            let content = `<option value="0">Tất cả</option>`;
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].category}</option>`
            }
            document.getElementById('category').innerHTML = content;
        }
    })
}
function getAuthor() {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/author/list",
        success:function (data){
            let content = `<option value="0">Tất cả</option>`;
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].authorName}</option>`
            }
            document.getElementById('author').innerHTML = content;
        }
    })
}
function findByCategory(){
    getAuthor()
    let id = $('#category').val();
    if (id == 0){
        return getAllBook();
    }
    $.ajax({
        type:"GET",
        url:'http://localhost:8080/books/list/category/' + id,
        success:function (data){
            let content ="";
            for (let i = 0; i < data.content.length; i++) {
                content += getBook(data.content[i]);
            }
            document.getElementById('listBook').innerHTML = content;
            document.getElementById('page').innerHTML = getPage(data)
            $(window).scrollTop(0);
        }
    })
}
function findByAuthor(){
    getCategory()
    let id = $('#author').val();
    if (id == 0){
        return getAllBook();
    }
    $.ajax({
        type:"GET",
        url:'http://localhost:8080/books/list/author/' + id,
        success:function (data){
            let content ="";
            for (let i = 0; i < data.content.length; i++) {
                content += getBook(data.content[i]);
            }
            document.getElementById('listBook').innerHTML = content;
            document.getElementById('page').innerHTML = getPage(data)
            $(window).scrollTop(0);
        }
    })
}
function getDetail(a) {
    let  id = a.getAttribute("id");
    localStorage.setItem("bookID", id);
    window.location.href ="/CaseStudy4_WS/products_detal.html"
}
function borrow(a){
    let bookID = a.getAttribute("id");
    let userID = JSON.parse(localStorage.getItem("customer")).id;

    $.ajax({
        type:"GET",
        url:"http://localhost:8080/cart/findCart/" + userID,
        success:function (data) {
            let cartID = data.id;
            let cartDetail = {book:{id:bookID}, cart:{id:cartID}}
            $.ajax({
                type:"POST",
                url:"http://localhost:8080/cartDetail/create",
                headers:{
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                data:JSON.stringify(cartDetail),
                success:function () {
                    getAllBook
                }
            })
        }
    })
}
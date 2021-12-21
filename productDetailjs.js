let bookID = localStorage.getItem("bookID");
let customer = JSON.parse(localStorage.getItem("customer"));
let userID = customer.id;

successHandlerBookDetail()




function successHandlerBookDetail() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/find/" + bookID,
        success: function (data) {
            let img = "/image/" + data.image;
            let content = `<div class="col-2">` +
                `<img src="${img}" width="100%" id="productImg">` +

                `</div>` +
                `<div class="col-2">` +
                ` <p>${getCategory(data.categoryList)}</p>` +
                ` <h1>${data.name}</h1>` +
                ` <input type="number" value="1">` +
                `  <a href="" class="btn">Thêm Vào Giỏ Sách</a>` +
                ` <h3>Chi Tiết Nội Dung Truyện` +
                ` <i class="fa fa- indent"></i>` +
                ` </h3>` +
                `  <br>` +
                `<p>${data.description}</p>` +

                ` </div>`
            document.getElementById("detail").innerHTML = content;
        }

    })
}

function addCartBook() {

}

function getCategory(data) {
    let content = ``;
    for (let i = 0; i < data.length; i++) {
        content += data[i].category + ' ';
    }
    return content;
}

function getComment(data) {
    let img = '/image/' + data.user.image
    return ` <div class="review mt-4">` +
        `  <div class="d-flex flex-row comment-user"><img class="rounded" src="${img}" width="40">` +
        `<div class="ml-2">` +
        `<div class"d-flex flex-row align-items-center">` +
        `<span class="name font-weight-bold">${data.user.fullName}</span><span class="dot"></span><span` +
        // `    class="date">12 Aug 2020</span></div>` +
        // `  <div class="rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i` +
        // `className="fa fa-star"></i><i class"fa fa-star"></i></div>` +
        ` </div>` +
        `  </div>` +
        `<div class="mt-2">` +
        `<p class="comment-text" style="color: lightblue">${data.comment}</p>` +
        `</div>` +
        ` </div>`
    // document.getElementById("commentDetail").innerHTML =
}

function createNewComment() {
    let comment = $('#newcomment').val();
    let newComment = {
        comment: comment,
        book: {id: bookID},
        user: {id: userID}
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ customer.accessToken
        },
        type: "POST",
        url: "http://localhost:8080/comments/create",
        data: JSON.stringify(newComment),
        success: successHandler,
    });
}

// successHandler();
function successHandler() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/comments/loadPage/" + bookID,

        success: function (data) {
            document.getElementById('comment').innerText = "Comment(" + data.totalElements + ")"
            let content ="";
            for (let i = 0; i < data.content.length; i++) {
                content += getComment(data.content[i])
            }
            document.getElementById('page').innerHTML="";
            if (data.number + 1 < data.totalPages){
                document.getElementById('page').innerHTML= `<button href="${data.number + 1}" onclick="load(this)">Load</button>`
            }
            document.getElementById("commentList").innerHTML = content;
            document.getElementById("addComment").innerHTML = "";
        }
    });
}

// function getComment(comment) {
//     return `<tr><td >${comment.user.fullName}</td>
//                         <td >${comment.comment}</td></tr>`
// };

function addComment() {
    let content = `<h5>Add comments</h5> <textarea id="newcomment" class="form-control"> </textarea>
        <div class="mt-3 d-flex justify-content-between align-items-center">
            <span id="count"></span> <button class="btn btn-sm btn-danger" onclick="createNewComment()">Submit</button> </div>`
    document.getElementById("addComment").innerHTML = content;
}
function load(a){
    let page = a.getAttribute("href");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/comments/loadPage/1?page=" + page,

        success: function (data) {

            let content =document.getElementById("commentList").innerHTML;
            for (let i = 0; i < data.content.length; i++) {
                content += getComment(data.content[i])
            }
            document.getElementById('page').innerHTML="";
            if (data.number + 1 < data.totalPages){
                document.getElementById('page').innerHTML= `<button href="${data.number + 1}" onclick="load(this)">Load</button>`
            }

            document.getElementById("commentList").innerHTML = content;
            document.getElementById("addComment").innerHTML = "";
        }
    });
}
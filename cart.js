let userID = JSON.parse(localStorage.getItem("customer")).id;
getCartDetail()

function getCartDetail(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/cartDetail/findByCart/" + userID,
        success:function (data){
            let content = `<tr>`+
                `<th>Book</th>`+
                `<th>Action</th>`+
                `</tr>`
            for (let i = 0; i < data.length; i++) {
                content += getDetail(data[i]);
            }
            document.getElementById('cartDetail').innerHTML = content;
        }
    })
}
function getDetail(detail){
    let img = '/image/' + detail.book.image;
    return `<tr>`+
        `<td>`+
        `<div class="cart-info">`+
        `<img src="${img}">`+
        `<div>`+
        `<p>${detail.book.name}</p>`+

        `</div>`+
        `</div>`+
        `</td>`+
        `<td>`+
        `<button onclick="deleteCartDetail(this)" id="${detail.id}">delete</button>`+
        `</td>`+
        `</tr>`
}
function deleteCartDetail(a){
    let detailID = a.getAttribute("id");
    $.ajax({
        type: "DELETE",
        url: 'http://localhost:8080/cartDetail/delete/'+ detailID,
        success: getCartDetail
    })
    event.defaultPrevented
}
function borrowCart(a){
    let cartID = a.getAttribute("id")
    $.ajax({
        url:"http://localhost:8080/cart/edit/" + cartID,
        type:"PUT",

    })
}
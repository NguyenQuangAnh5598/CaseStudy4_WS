function CreateAuthor() {
    let authorName = $('#authorName').val();
    let book = $('#books').val();
    let author = {
        authorName: authorName,
        book: {id: book}
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/author/create",
        data: JSON.stringify(author),
        success: successHandler
    })
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/author/list",
        success: function (data) {
            let content = '    <tr>\n' +
                '        <td>Author Name</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getAuthor(data[i])
            }
            document.getElementById('authorList').innerHTML = content;
        }
    })
}
successHandler();




function getAuthor(author) {
    return `<tr><td >${author.authorName}</td>` +
        `<td><button type="submit" value="${author.id}" onclick="editForm(this)">Edit</button></td>` +
        `<td><button type="submit" value="${author.id}" onclick="deleteAuthor(this)">Delete</button></td>
</tr>`;
}

function updateAuthor() {
    let id = $('#idEdit').val();
    let authorName = $('#authorNameEdit').val();

    let newAuthor = {
        id: id,
        authorName: authorName,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/author/update",
        data: JSON.stringify(newAuthor),
        success: successHandler
    });
    event.preventDefault();
}

function editForm(kax) {
    let id = kax.getAttribute("value");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/author/findOne/" + id,
        success: function (author) {
            $('#idEdit').val(id);
            $('#authorNameEdit').val(author.authorName);
        }
    });
    event.preventDefault();

}
function deleteAuthor(kax){
    let id  = kax.getAttribute("value");
    $.ajax({
        type:"DELETE",
        url : "http://localhost:8080/author/delete/" + id,
        success : successHandler
    })
    event.preventDefault();
}



function loginForm(){
    let content = `<div class="form-group py-2">`+
        `<div class="input-field"><span class="far fa-user p-2"></span>`+
            `<input type="text" id="username"  placeholder="Username or Email" required></div>`+
    `</div>`+
    `<div class="form-group py-1 pb-2">`+
        `<div class="input-field" id="inputPass"><span class="fas fa-lock px-2"></span>`+
            `<input type="password" id="password" placeholder="Enter your Password" required>`+
            `<button class="btn bg-white text-muted"><span class="far fa-eye-slash"></span></button></div>`+
        `</div>`+
    `<div class="form-inline"><input type="checkbox" name="remember" id="remember">`+
        `<label html="remember" class="text-muted">Remember me</label>` +
    `<a href="#" id="forgot" class="font-weight-bold">Forgot password?</a></div>`+
    `<a class="btn btn-primary btn-block mt-3" onClick="login1()">Login</a>`+
    `<div class="text-center pt-4 text-muted">Don't have an account? <a href="Register.html">Register</a></div>`
    document.getElementById('loginForm').innerHTML = content;
}
function login1(){
    let username = $('#username').val();
    let password = $('#password').val();
    let data = {
        username: username,
        password: password
    }
    $.ajax({
        url: "http://localhost:8080/api/login",
        type: 'POST',
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        data:JSON.stringify(data),
        success: function (user){

            localStorage.setItem("customer", JSON.stringify(user))
            window.location.href ="/CaseStudy4_WS/index.html"

        }
    })
    event.defaultPrevented
}
function register(){
    let username = $('#username').val();
    let password = $('#password').val();
    let data = {
        username: username,
        password: password
    }
    $.ajax({
        url: "http://localhost:8080/user/register",
        type: 'POST',
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        data:JSON.stringify(data),
        success: function (user){
            localStorage.setItem("username", username);
            localStorage.setItem("pass", password);
            window.location.href ="/CaseStudy4_WS/Login.html"

        }
    })
    event.defaultPrevented
}
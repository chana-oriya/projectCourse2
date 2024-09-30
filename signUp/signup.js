

function onRegister(event) {
    event.preventDefault()
    let users = JSON.parse(localStorage.getItem("users"))

    let username = document.getElementById("username").value
    let phone = document.getElementById("phone").value
    let password = document.getElementById("password").value
    let email = document.getElementById("email").value
    let userDataObj = { username, password, phone, email }

    if (users === null) {
        localStorage.setItem("users", JSON.stringify([userDataObj]))
    }
    else {
        
        localStorage.setItem("users", JSON.stringify([...users, userDataObj]))
    }
    location.href="../logIn/logIn.html";


}







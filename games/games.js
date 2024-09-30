function name(){
     let user = JSON.parse(localStorage.getItem("currentUser"))
    document.getElementById("logIn").innerHTML= "Hello " +user.username+"!";
}

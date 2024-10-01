

function onSubmit(event){
    event.preventDefault();
    let name=document.getElementById("username").value;
    
    let password=document.getElementById("password").value;
   
    let users = JSON.parse(localStorage.getItem("users"))
   
    let currentUser=users.find(user=>{
    
        return user.username===name && user.password===password
    })

   
    

    if(currentUser)
        {
           location.href="../games/games.html";
        }
    else
    {
        alert("Invalid username or password");
    } 
    localStorage.setItem("currentUser", JSON.stringify( currentUser))
  
} 
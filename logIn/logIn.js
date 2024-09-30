

function onSubmit(event){
    event.preventDefault();
    let name=document.getElementById("username").value;
    
    let password=document.getElementById("password").value;
   
    let users = JSON.parse(localStorage.getItem("users"))
    console.log(users);
    let currentUser=users.find(user=>{
        console.log('user: ', user);
        console.log( (user.username===name) && (user.password===password));
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
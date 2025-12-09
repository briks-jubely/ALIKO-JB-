document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if(username === "student" && password === "1234"){
    localStorage.setItem("loggedIn", "yes");
    window.location.href = "academy.html";
  } else {
    document.getElementById("loginMsg").innerText = "Invalid username or password";
  }
});

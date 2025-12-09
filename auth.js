function showLogin(){
  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
}

function showRegister(){
  document.getElementById("registerBox").classList.remove("hidden");
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
}

/* REGISTER */
document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let username = document.getElementById("regUser").value;

  if(users.find(u => u.username === username)){
    document.getElementById("registerMsg").innerText = "Username already exists";
    return;
  }

  users.push({
    name: document.getElementById("regName").value,
    username: username,
    password: document.getElementById("regPass").value
  });

  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("registerMsg").innerText = "Registration successful. Login now.";

  showLogin();
});

/* LOGIN */
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let u = document.getElementById("loginUser").value;
  let p = document.getElementById("loginPass").value;

  let match = users.find(user => user.username === u && user.password === p);

  if(match){
    localStorage.setItem("loggedIn", "yes");
    window.location.href = "academy.html";
  } else {
    document.getElementById("loginMsg").innerText = "Invalid login details";
  }
});

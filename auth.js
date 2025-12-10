// Hakikisha users storage ipo
if(!localStorage.getItem("users")){
  localStorage.setItem("users", JSON.stringify([]));
}

// TAB SWITCH
function showLogin(){
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("registerTab").classList.remove("active");
}

function showRegister(){
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.add("active");
}

// REGISTER
function register(){
  let name = regName.value.trim();
  let username = regUser.value.trim();
  let password = regPass.value.trim();

  if(!name || !username || !password){
    regMsg.innerText = "Fill all fields";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users"));

  if(users.find(u => u.username === username)){
    regMsg.innerText = "Username already exists";
    return;
  }

  users.push({ name, username, password });
  localStorage.setItem("users", JSON.stringify(users));

  regMsg.style.color = "#22c55e";
  regMsg.innerText = "Account created! You can login";

  showLogin();
}

// LOGIN
function login(){
  let username = loginUser.value.trim();
  let password = loginPass.value.trim();

  let users = JSON.parse(localStorage.getItem("users"));

  let user = users.find(u => u.username === username && u.password === password);

  if(!user){
    loginMsg.innerText = "Invalid login";
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(user));

  location.href = "academy.html";
}

// LOGOUT
function logout(){
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  location.href = "workshop.html";
}

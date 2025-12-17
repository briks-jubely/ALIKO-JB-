<script>
alert("auth.js loaded");

/* ==========================
   INIT USERS STORAGE
========================== */
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

/* ==========================
   FORM SWITCHING
========================== */
function showLogin() {
  loginForm.classList.add("active");
  regForm.classList.remove("active");
  loginTab.classList.add("active");
  regTab.classList.remove("active");
}

function showRegister() {
  regForm.classList.add("active");
  loginForm.classList.remove("active");
  regTab.classList.add("active");
  loginTab.classList.remove("active");
}

/* ==========================
   REGISTER USER
========================== */
function registerUser() {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const users = JSON.parse(localStorage.getItem("users"));

  if (!username || !password) {
    regMsg.textContent = "Fill all fields";
    return;
  }

  if (users.find(u => u.username === username)) {
    regMsg.textContent = "Username already exists";
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  regMsg.textContent = "Account created successfully!";
  regMsg.classList.add("success");

  setTimeout(showLogin, 800);
}

/* ==========================
   LOGIN USER
========================== */
function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const users = JSON.parse(localStorage.getItem("users"));

  const found = users.find(
    u => u.username === username && u.password === password
  );

  if (!found) {
    loginMsg.textContent = "Invalid username or password";
    return;
  }

  /* 🔐 AUTH KEYS (STANDARDIZED) */
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(found));

  window.location.href = "academy.html";
}

/* ==========================
   LOGOUT USER (FIXED)
========================== */
function logout() {
  console.log("Logout triggered");

  /* Safely clear auth data */
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");

  /* Redirect */
  window.location.href = "login.html";
}
/* INIT USERS */
if(!localStorage.getItem("users")){
  localStorage.setItem("users", JSON.stringify([]));
}

/* USER DETECTION */
function detectUser(){
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedUser = localStorage.getItem("loggedInUser");

  if(loggedUser) return;

  if(users.length === 0){
    localStorage.setItem("authMode", "register");
  } else {
    localStorage.setItem("authMode", "login");
  }
}

/* REGISTER */
function registerUser(){
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const regMsg = document.getElementById("regMsg");

  const users = JSON.parse(localStorage.getItem("users"));

  if(!username || !password){
    regMsg.textContent = "Fill all fields";
    return;
  }

  if(users.find(u => u.username === username)){
    regMsg.textContent = "Username already exists";
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("loggedInUser", username);

  regMsg.textContent = "Account created successfully!";
  regMsg.className = "msg success";

  notifyAdmin();
  setTimeout(() => {
    window.location.href = "academy.html";
  }, 800);
}

/* LOGIN */
function loginUser(){
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const loginMsg = document.getElementById("loginMsg");

  const users = JSON.parse(localStorage.getItem("users"));

  const found = users.find(
    u => u.username === username && u.password === password
  );

  if(!found){
    loginMsg.textContent = "Invalid username or password";
    return;
  }

  localStorage.setItem("loggedInUser", username);
  window.location.href = "academy.html";
}

/* LOGOUT */
function logout(){
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

/* USER COUNT */
function getUserCount(){
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.length;
}

/* WHATSAPP NOTIFY */
function notifyAdmin(){
  const count = getUserCount();
  const msg = `ALIKO JB ACADEMY UPDATE:%0A👥 Total Users: ${count}`;
  window.open(`https://wa.me/255620198672?text=${msg}`, "_blank");
}
</script>

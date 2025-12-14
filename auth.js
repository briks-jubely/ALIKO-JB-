<script>
  alert("auth.js loaded");
/* INIT */
if(!localStorage.getItem("users")){
  localStorage.setItem("users", JSON.stringify([]));
}

/* CHANGE FORMS */
function showLogin(){
  loginForm.classList.add("active");
  regForm.classList.remove("active");
  loginTab.classList.add("active");
  regTab.classList.remove("active");
}

function showRegister(){
  regForm.classList.add("active");
  loginForm.classList.remove("active");
  regTab.classList.add("active");
  loginTab.classList.remove("active");
}

/* REGISTER */
function registerUser(){
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const users = JSON.parse(localStorage.getItem("users"));

  if(!username || !password){
    regMsg.textContent = "Fill all fields";
    return;
  }

  if(users.find(u => u.username === username)){
    regMsg.textContent = "Username already exists";
    return;
  }

  users.push({username, password});
  localStorage.setItem("users", JSON.stringify(users));

  regMsg.textContent = "Account created! Login now";
  regMsg.classList.add("success");

  setTimeout(showLogin, 700);
}

/* LOGIN */
function loginUser(){
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users"));

  const found = users.find(u => u.username === username && u.password === password);

  if(!found){
    loginMsg.textContent = "Invalid username or password";
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(found));

  window.location.href = "academy.html";
}
function logout() {
  // Weka flag ya muda
  sessionStorage.setItem("loggingOut", "true");

  // Futa user
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("registeredUser");

  // Muda mfupi kabla ya redirect
  setTimeout(() => {
    sessionStorage.removeItem("loggingOut");
    window.location.href = "login.html";
  }, 300);
}
</script>

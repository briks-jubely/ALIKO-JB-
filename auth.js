<script>
/* =========================
   INITIAL SETUP
========================= */

// Hakikisha users store ipo
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

/* =========================
   TAB SWITCHING (LOGIN / REGISTER)
========================= */

function showLogin() {
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("regForm").classList.remove("active");
  document.getElementById("loginTab").classList.add("active");
  document.getElementById("regTab").classList.remove("active");
}

function showRegister() {
  document.getElementById("regForm").classList.add("active");
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("regTab").classList.add("active");
  document.getElementById("loginTab").classList.remove("active");
}

/* =========================
   REGISTER USER
========================= */

function registerUser() {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const regMsg = document.getElementById("regMsg");

  const users = JSON.parse(localStorage.getItem("users"));

  if (!username || !password) {
    regMsg.textContent = "Fill all fields";
    regMsg.className = "msg";
    return;
  }

  if (users.find(u => u.username === username)) {
    regMsg.textContent = "Username already exists";
    regMsg.className = "msg";
    return;
  }

  // Hifadhi user
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  regMsg.textContent = "Account created successfully! Please login.";
  regMsg.className = "msg success";

  setTimeout(showLogin, 800);
}

/* =========================
   LOGIN USER
========================= */

function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const loginMsg = document.getElementById("loginMsg");

  const users = JSON.parse(localStorage.getItem("users"));

  const found = users.find(
    u => u.username === username && u.password === password
  );

  if (!found) {
    loginMsg.textContent = "Invalid username or password";
    loginMsg.className = "msg";
    return;
  }

  // Session sahihi
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(found));

  window.location.href = "academy.html";
}

/* =========================
   LOGOUT USER
========================= */

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/* =========================
   PROTECT ACADEMY PAGE
========================= */

function protectAcademy() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}
</script>
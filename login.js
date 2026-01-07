// js/login.js
import { registerUser, loginUser, watchAuth } from "./auth.js";

/* FORM SWITCH */
window.showLogin = () => {
  loginForm.classList.add("active");
  regForm.classList.remove("active");
  loginTab.classList.add("active");
  regTab.classList.remove("active");
};

window.showRegister = () => {
  regForm.classList.add("active");
  loginForm.classList.remove("active");
  regTab.classList.add("active");
  loginTab.classList.remove("active");
};

/* REGISTER */
window.registerUser = async () => {
  const name = regUsername.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  if (!name || !email || !password) {
    regMsg.textContent = "Tafadhali jaza taarifa zote";
    return;
  }

  try {
    await registerUser(name, email, password);
    regMsg.textContent = "Account created successfully!";
    regMsg.className = "msg success";
    setTimeout(() => location.href = "academy.html", 800);
  } catch (e) {
    regMsg.textContent = e.message;
  }
};

/* LOGIN */
window.loginUser = async () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  try {
    await loginUser(email, password);
    location.href = "academy.html";
  } catch {
    loginMsg.textContent = "Email au password sio sahihi";
  }
};

/* AUTO REDIRECT IF LOGGED IN */
watchAuth((user) => {
  if (user) location.href = "academy.html";
});

/* DOM refs */
const loginForm = document.getElementById("loginForm");
const regForm = document.getElementById("regForm");
const loginTab = document.getElementById("loginTab");
const regTab = document.getElementById("regTab");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginMsg = document.getElementById("loginMsg");

const regUsername = document.getElementById("reg-username");
const regEmail = document.getElementById("reg-email");
const regPassword = document.getElementById("reg-password");
const regMsg = document.getElementById("regMsg");

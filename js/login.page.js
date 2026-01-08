// js/login.page.js
import { registerUser, loginUser, observeAuth } from "auth.js";

/* ======================
   DOM REFERENCES
====================== */
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

/* ======================
   TAB SWITCHING
====================== */
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

/* ======================
   REGISTER HANDLER
====================== */
window.registerUserHandler = async () => {
  regMsg.textContent = "";

  const name = regUsername.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  if (!name || !email || !password) {
    regMsg.textContent = "Tafadhali jaza taarifa zote";
    return;
  }

  try {
    await registerUser({ name, email, password });

    regMsg.textContent = "Account created successfully!";
    regMsg.className = "msg success";

    setTimeout(() => {
      window.location.href = "academy.html";
    }, 800);

  } catch (err) {
    regMsg.textContent = err.message;
  }
};

/* ======================
   LOGIN HANDLER
====================== */
window.loginUserHandler = async () => {
  loginMsg.textContent = "";

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!email || !password) {
    loginMsg.textContent = "Weka email na password";
    return;
  }

  try {
    await loginUser({ email, password });
    window.location.href = "academy.html";
  } catch (err) {
    loginMsg.textContent = "Email au password sio sahihi";
  }
};

/* ======================
   AUTO REDIRECT IF LOGGED IN
====================== */
observeAuth((user) => {
  if (user && location.pathname.includes("login")) {
    window.location.href = "academy.html";
  }
});

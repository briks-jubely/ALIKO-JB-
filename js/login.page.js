// login.page.js (module)
import { auth, db, registerUser, loginUser } from './auth.js';

// DOM elements
const loginForm = document.getElementById('loginForm');
const regForm = document.getElementById('regForm');
const loginMsg = document.getElementById('loginMsg');
const regMsg = document.getElementById('regMsg');

// Form switching
window.showLogin = () => {
  loginForm.classList.add('active');
  regForm.classList.remove('active');
};
window.showRegister = () => {
  regForm.classList.add('active');
  loginForm.classList.remove('active');
};

// Handlers
window.registerUserHandler = async () => {
  const name = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value.trim();
  if (!name || !email || !password) return regMsg.textContent = "Jaza taarifa zote";

  try {
    await registerUser(email, password, name); // function from auth.js
    regMsg.textContent = "Account created successfully!";
    regMsg.className = "msg success";
    setTimeout(() => window.location.href = 'academy.html', 1000);
  } catch (e) {
    regMsg.textContent = e.message;
  }
};

window.loginUserHandler = async () => {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  try {
    const { role } = await loginUser(email, password); // function from auth.js
    window.location.href = role === 'admin' ? 'admin.html' : 'academy.html';
  } catch (e) {
    loginMsg.textContent = "Email au password sio sahihi";
  }
};

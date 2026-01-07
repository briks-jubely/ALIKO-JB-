// login.page.js
import { registerUser, loginUser, observeAuth } from "./auth.js";

const loginForm = document.getElementById("loginForm");
const regForm = document.getElementById("regForm");
const loginTab = document.getElementById("loginTab");
const regTab = document.getElementById("regTab");
const loginMsg = document.getElementById("loginMsg");
const regMsg = document.getElementById("regMsg");

// FORM SWITCH
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

// REGISTER
window.registerUserHandler = async () => {
    const name = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!name || !email || !password) {
        regMsg.textContent = "Tafadhali jaza taarifa zote";
        return;
    }

    try {
        await registerUser(email, password, name);
        regMsg.textContent = "Account created successfully!";
        regMsg.className = "msg success";
        setTimeout(() => { window.location.href = "academy.html"; }, 1000);
    } catch (e) {
        regMsg.textContent = e.message;
    }
};

// LOGIN
window.loginUserHandler = async () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
        const { role } = await loginUser(email, password);
        if (role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "academy.html";
        }
    } catch (e) {
        loginMsg.textContent = "Email au password sio sahihi";
    }
};

// AUTO REDIRECT IF LOGGED IN
observeAuth((user) => {
    if (user) window.location.href = "academy.html";
});

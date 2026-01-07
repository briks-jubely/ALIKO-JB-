import { registerUser, loginUser } from "./auth.js";

/* SWITCH TABS */
window.showLogin = () => {
  loginForm.classList.add("active");
  regForm.classList.remove("active");
};

window.showRegister = () => {
  regForm.classList.add("active");
  loginForm.classList.remove("active");
};

/* REGISTER */
window.handleRegister = async () => {
  const name = regUsername.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  try {
    await registerUser({ name, email, password });
    location.href = "academy.html";
  } catch (e) {
    regMsg.textContent = e.message;
  }
};

/* LOGIN */
window.handleLogin = async () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  try {
    const { role } = await loginUser({ email, password });
    location.href = role === "admin" ? "admin.html" : "academy.html";
  } catch {
    loginMsg.textContent = "Email or password incorrect";
  }
};

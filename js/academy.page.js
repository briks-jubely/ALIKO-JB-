import { logoutUser, observeAuth } from "./auth.js";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
    await logoutUser();
    window.location.href = "login.html";
});

// optional: redirect if not logged in
observeAuth((user) => {
    if (!user) window.location.href = "login.html";
});

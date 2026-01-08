import { watchAuth, logoutUser } from "./auth.js";

console.log("academy.page.js loaded");

/* AUTH GUARD */
watchAuth((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

/* LOGOUT */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    console.log("Logout clicked");

    await logoutUser();

    // IMPORTANT: force reload
    window.location.replace("login.html");
  });
}

import { logoutUser, observeAuth } from "./auth.js";

/* AUTH GUARD */
observeAuth(user => {
  if (!user) location.href = "login.html";
});

/* LOGOUT BUTTON */
document
  .getElementById("logoutBtn")
  .addEventListener("click", async () => {
    await logoutUser();
    location.href = "login.html";
  });

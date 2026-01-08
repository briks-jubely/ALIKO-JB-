// js/academy.page.js
import { logoutUser } from "./auth.js";

/* DOM */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await logoutUser();
      window.location.href = "login.html"; // redirect to login page
    } catch (e) {
      console.error("Logout failed:", e);
    }
  });
}

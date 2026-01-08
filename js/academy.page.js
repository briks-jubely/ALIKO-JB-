// js/academy.page.js
import { logoutUser } from "./auth.js";
import { loadCourses } from "./courses.js";

/* DOM Refs */
const logoutBtn = document.getElementById("logoutBtn");
const coursesContainer = document.getElementById("coursesContainer");
const statusMsg = document.getElementById("status");

/* Logout Listener */
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await logoutUser();
      window.location.href = "login.html"; // redirect to login
    } catch (e) {
      console.error("Logout failed:", e);
    }
  });
}

/* Load Courses */
if (coursesContainer) {
  loadCourses(coursesContainer, statusMsg);
}

/* Optional: Auth Guard (redirect if not logged in) */
import { observeAuth } from "./auth.js";

observeAuth(user => {
  if (!user) {
    window.location.href = "login.html";
  }
});

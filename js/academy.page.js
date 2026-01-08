import { logoutUser, observeAuth } from "./auth.js";
import { loadCourses } from "./courses.js";

/* DOM Refs */
const logoutBtn = document.getElementById("logoutBtn");
const coursesContainer = document.getElementById("coursesContainer");
const statusMsg = document.getElementById("status");

/* AUTH GUARD */
let authObserver = observeAuth((user) => {
  if (!user) {
    window.location.replace("login.html");
  }
});

/* LOGOUT */
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      // 🚨 STOP observer BEFORE logout
      if (authObserver) authObserver();

      await logoutUser();

      window.location.replace("login.html");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  });
}

/* LOAD COURSES */
if (coursesContainer) {
  loadCourses(coursesContainer, statusMsg);
        }

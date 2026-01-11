// js/academy.page.js

import { auth, logoutUser } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { loadCourses } from "./courses.js";

/* =========================
   DOM REFERENCES
========================= */
const logoutBtn = document.getElementById("logoutBtn");
const coursesContainer = document.getElementById("coursesContainer");
const statusMsg = document.getElementById("status");

/* =========================
   AUTH GUARD
========================= */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("login.html");
  } else {
    // user yupo → pakia courses
    loadCourses(coursesContainer, statusMsg);
  }
});

/* =========================
   LOGOUT
========================= */
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await logoutUser();
      window.location.replace("login.html");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  });
}

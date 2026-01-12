// js/academy.page.js
import { auth, logoutUser } from "./auth.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { loadCourses } from "./courses.js";

/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const logoutBtn = document.getElementById("logoutBtn");
  const coursesContainer = document.getElementById("coursesContainer");
  const statusMsg = document.getElementById("status");

  /* =========================
     AUTH GUARD
  ========================= */
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("login.html");
    }
  });

  /* =========================
     LOGOUT
  ========================= */
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await logoutUser();
      window.location.replace("login.html");
    });
  }

  /* =========================
     LOAD COURSES
  ========================= */
  if (coursesContainer && statusMsg) {
    loadCourses(coursesContainer, statusMsg);
  } else {
    console.error("❌ coursesContainer or statusMsg missing in HTML");
  }
});

// js/academy.page.js

import { auth, logoutUser, observeAuth } from "./auth.js";
import { loadCourses } from "./courses.js";

/* ===== DOM Refs ===== */
const logoutBtn = document.getElementById("logoutBtn");
const coursesContainer = document.getElementById("coursesContainer");
const statusMsg = document.getElementById("status");

/* ===== LOGOUT ===== */
logoutBtn.addEventListener("click", async () => {
  await logoutUser();
  window.location.href = "login.html"; // au login+register.html kama unavyoita
});

/* ===== AUTH GUARD ===== */
observeAuth((user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    // User logged in, load courses
    loadCourses(coursesContainer, statusMsg);
  }
});

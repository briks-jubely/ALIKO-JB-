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

let unsubscribeCourses = null; // 🔑 track snapshot unsubscribe

/* =========================
   AUTH GUARD + LOAD COURSES
========================= */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Mobile browsers, GitHub pages redirect safi baada ya loadCourses
    console.warn("User not logged in, redirect to login after delay");
    setTimeout(() => window.location.replace("login.html"), 100);
    return;
  }

  console.log("User logged in:", user.email);

  // Load courses sasa tu
  if (coursesContainer && statusMsg) {
    if (unsubscribeCourses) unsubscribeCourses(); // clean previous listener
    unsubscribeCourses = loadCourses(coursesContainer, statusMsg);
  }
});

/* =========================
   LOGOUT (SAFE & CLEAN)
========================= */
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      // Remove courses listener before logout
      if (unsubscribeCourses) unsubscribeCourses();

      await logoutUser();
      window.location.replace("login.html");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  });
}

import { auth, logoutUser } from "./auth.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { loadCourses } from "./courses.js";

const logoutBtn = document.getElementById("logoutBtn");
const coursesContainer = document.getElementById("coursesContainer");
const statusMsg = document.getElementById("status");

let coursesLoaded = false;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace("login.html");
    return;
  }

  // ✅ LOAD MARA MOJA TU
  if (!coursesLoaded) {
    coursesLoaded = true;
    loadCourses(coursesContainer, statusMsg);
  }
});

logoutBtn?.addEventListener("click", async () => {
  await logoutUser();
  window.location.replace("login.html");
});

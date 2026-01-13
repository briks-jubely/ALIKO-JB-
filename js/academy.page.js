import { auth, logoutUser } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { loadCourses } from "./courses.js";
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { db } from "./auth.js";

/* =========================
   DOM REFERENCES
========================= */
const logoutBtn = document.getElementById("logoutBtn");
const coursesContainer = document.getElementById("coursesContainer");
const statusMsg = document.getElementById("status");

let unsubscribeCourses = null;

/* =========================
   AUTH GUARD + LOAD COURSES
========================= */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    setTimeout(() => window.location.replace("login.html"), 100);
    return;
  }

  console.log("User logged in:", user.email);

  if (coursesContainer && statusMsg) {
    if (unsubscribeCourses) unsubscribeCourses();
    unsubscribeCourses = loadCourses(coursesContainer, statusMsg);

    // 🔥 Add interaction listeners after courses loaded
 document.addEventListener("coursesLoaded", () => {
  attachCourseListeners(user.uid);
});
  }
});

/* =========================
   LOGOUT
========================= */
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      if (unsubscribeCourses) unsubscribeCourses();
      await logoutUser();
      window.location.replace("login.html");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  });
}

/* =========================
   COURSE INTERACTIONS
========================= */
function attachCourseListeners(userId) {
  const cards = document.querySelectorAll(".course-card");

  cards.forEach(card => {
    const courseId = card.dataset.courseId;

    // Video button
    const btnVideo = card.querySelector(".btn-video");
    if (btnVideo) {
      btnVideo.addEventListener("click", () => {
        const url = card.dataset.video || "#";
        window.open(url, "_blank");
      });
    }

    // PDF button
    const btnPDF = card.querySelector(".btn-pdf");
    if (btnPDF) {
      btnPDF.addEventListener("click", () => {
        const url = card.dataset.pdf || "#";
        window.open(url, "_blank");
      });
    }

    // Vote button
    const btnVote = card.querySelector(".btn-vote");
    if (btnVote) {
      btnVote.addEventListener("click", async () => {
        try {
          const courseRef = doc(db, "courses", courseId);
          await updateDoc(courseRef, { votes: increment(1) });
          btnVote.textContent = "👍 Voted!";
          btnVote.disabled = true;
        } catch (err) {
          console.error("Vote failed:", err);
        }
      });
    }
  });
}

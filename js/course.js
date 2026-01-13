import { db } from "./auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// 1️⃣ Get courseId from URL
const params = new URLSearchParams(window.location.search);
const courseId = params.get("courseId");

if (!courseId) {
  document.body.innerHTML = "<h2>Course haijachaguliwa</h2>";
  throw new Error("No courseId found in URL");
}

// 2️⃣ DOM
const titleEl = document.getElementById("course-title");
const descEl = document.getElementById("course-description");
const mediaEl = document.getElementById("course-media");

// 3️⃣ Fetch from Firestore
async function loadCourse() {
  try {
    const ref = doc(db, "courses", courseId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      titleEl.textContent = "Course haipo";
      return;
    }

    const c = snap.data();

    titleEl.textContent = c.title;
    descEl.textContent = c.description;

    mediaEl.innerHTML = "";

    if (c.video) {
      mediaEl.innerHTML += `
        <h3>Video Lesson</h3>
        <video controls width="100%">
          <source src="${c.video}">
        </video>
      `;
    }

    if (c.pdf) {
      mediaEl.innerHTML += `
        <h3>Notes</h3>
        <a href="${c.pdf}" target="_blank" class="btn-open-course">
          Fungua PDF
        </a>
      `;
    }

  } catch (err) {
    console.error(err);
    titleEl.textContent = "Kuna tatizo la kupakia kozi";
  }
}

loadCourse();

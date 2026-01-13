import { db } from "./auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const courseId = params.get("courseId");

if (!courseId) {
  document.body.innerHTML = "<h2>Course haijachaguliwa</h2>";
  throw new Error("No courseId found in URL");
}

const titleEl = document.getElementById("course-title");
const descEl = document.getElementById("course-description");
const levelEl = document.getElementById("course-level");
const durationEl = document.getElementById("course-duration");
const badgeEl = document.getElementById("course-badge");
const imgEl = document.getElementById("course-image");
const mediaEl = document.getElementById("course-media");
const lessonsEl = document.getElementById("course-lessons");

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
    levelEl.textContent = c.level || "All";
    durationEl.textContent = c.duration || "Unknown";
    imgEl.src = c.image || "icon-192.png";

    badgeEl.textContent = c.free ? "FREE" : "LOCKED";
    badgeEl.className = `badge ${c.free ? "free" : "locked"}`;

    // Media
    mediaEl.innerHTML = "";
    if(c.video){
      mediaEl.innerHTML += `
        <h3>Video Lesson</h3>
        <video controls width="100%">
          <source src="${c.video}">
        </video>
      `;
    }
    if(c.pdf){
      mediaEl.innerHTML += `
        <h3>Notes / PDF</h3>
        <a href="${c.pdf}" target="_blank" class="btn-open-course">
          Fungua PDF
        </a>
      `;
    }

    // Lessons list
    if(c.lessons && c.lessons.length > 0){
      lessonsEl.innerHTML = `<h3>Lessons</h3><ul>` + 
        c.lessons.map(l => `<li>${l.title}</li>`).join('') +
        `</ul>`;
    }

  } catch (err) {
    console.error(err);
    titleEl.textContent = "Kuna tatizo la kupakia kozi";
  }
}

loadCourse();

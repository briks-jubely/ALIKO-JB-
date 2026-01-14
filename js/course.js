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

    // Basic info
    titleEl.textContent = c.title;
    descEl.textContent = c.description;
    levelEl.textContent = c.level || "All";
    durationEl.textContent = c.duration || "Unknown";
    imgEl.src = c.image || "icon-192.png";

    // FREE / PAID badge
    badgeEl.textContent = c.free ? "FREE" : "LOCKED";
    badgeEl.className = `badge ${c.free ? "free" : "locked"}`;

    // Media logic
    mediaEl.innerHTML = "";

    if (c.free) {
      if (c.video) {
        mediaEl.innerHTML += `
          <h3>🎥 Video Lesson</h3>
          <video controls width="100%">
            <source src="${c.video}">
          </video>
        `;
      }

      if (c.pdf) {
        mediaEl.innerHTML += `
          <h3>📄 Notes / PDF</h3>
          <a href="${c.pdf}" target="_blank" class="btn-open-course">
            Fungua PDF
          </a>
        `;
      }
    } else {
      mediaEl.innerHTML = `
        <div class="locked-box">
          <h3>🔒 Course Imefungwa</h3>
          <p>
            Hii ni course ya malipo.  
            Tafadhali lipa au wasiliana na admin ili ufunguliwe.
          </p>
          <button class="btn-pay">Lipia Course</button>
        </div>
      `;
    }

    // Lessons
    lessonsEl.innerHTML = "";
    if (c.lessons && c.lessons.length > 0) {
      if (c.free) {
        lessonsEl.innerHTML =
          `<h3>📚 Lessons</h3><ul>` +
          c.lessons.map(l => `<li>${l.title}</li>`).join("") +
          `</ul>`;
      } else {
        lessonsEl.innerHTML = `
          <h3>📚 Lessons</h3>
          <p>🔒 Lessons zitafunguliwa baada ya malipo</p>
        `;
      }
    }

  } catch (err) {
    console.error(err);
    titleEl.textContent = "Kuna tatizo la kupakia course";
  }
}

loadCourse();

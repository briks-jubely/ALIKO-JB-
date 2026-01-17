import { db } from "./auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* ----------------------------------
   GET courseId FROM URL
---------------------------------- */
const params = new URLSearchParams(window.location.search);
const courseId = params.get("courseId");

if (!courseId) {
  document.body.innerHTML = "<h2>❌ Course haijachaguliwa</h2>";
  throw new Error("No courseId found in URL");
}

/* ----------------------------------
   DOM ELEMENTS
---------------------------------- */
const titleEl = document.getElementById("course-title");
const descEl = document.getElementById("course-description");
const levelEl = document.getElementById("course-level");
const durationEl = document.getElementById("course-duration");
const badgeEl = document.getElementById("course-badge");
const imgEl = document.getElementById("course-image");
const mediaEl = document.getElementById("course-media");
const lessonsEl = document.getElementById("course-lessons");

/* OPTIONAL SECTIONS */
const objectivesEl = document.getElementById("course-objectives");
const systemEl = document.getElementById("course-system-overview");
const sensorsEl = document.getElementById("course-sensors");
const actuatorsEl = document.getElementById("course-actuators");
const wpEl = document.getElementById("course-working-principle");
const diagEl = document.getElementById("course-diagnostics");
const instructorEl = document.getElementById("course-instructor");
const certificateEl = document.getElementById("course-certificate");

/* ----------------------------------
   LOAD COURSE
---------------------------------- */
async function loadCourse() {
  try {
    const ref = doc(db, "courses", courseId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      titleEl.textContent = "❌ Course haipo";
      return;
    }

    const c = snap.data();

    /* BASIC INFO */
    titleEl.textContent = c.title || "Untitled Course";
    descEl.textContent = c.fullDescription || c.shortDescription || "";
    levelEl.textContent = c.level || "All";
    durationEl.textContent = c.duration || "Unknown";
    imgEl.src = c.image || "icon-192.png";

    /* FREE / PAID BADGE */
    badgeEl.textContent = c.free ? "FREE" : "LOCKED";
    badgeEl.className = `badge ${c.free ? "free" : "locked"}`;

    /* OPTIONAL SECTIONS RENDERING */
    if (objectivesEl && Array.isArray(c.objectives)) {
      objectivesEl.innerHTML = "";
      c.objectives.forEach(o => {
        const li = document.createElement("li");
        li.textContent = o;
        objectivesEl.appendChild(li);
      });
    }

    if (systemEl && c.systemOverview) {
      systemEl.textContent = c.systemOverview;
    }

    if (sensorsEl && Array.isArray(c.sensors)) {
      sensorsEl.innerHTML = "";
      c.sensors.forEach(s => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${s.name}:</strong> ${s.description}`;
        sensorsEl.appendChild(li);
      });
    }

    if (actuatorsEl && Array.isArray(c.actuators)) {
      actuatorsEl.innerHTML = "";
      c.actuators.forEach(a => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${a.name}:</strong> ${a.description}`;
        actuatorsEl.appendChild(li);
      });
    }

    if (wpEl && Array.isArray(c.workingPrinciple)) {
      wpEl.innerHTML = "";
      c.workingPrinciple.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        wpEl.appendChild(li);
      });
    }

    if (diagEl && Array.isArray(c.diagnostics)) {
      diagEl.innerHTML = "";
      c.diagnostics.forEach(d => {
        const li = document.createElement("li");
        li.textContent = d;
        diagEl.appendChild(li);
      });
    }

    if (instructorEl) instructorEl.textContent = c.instructor || "";
    if (certificateEl) certificateEl.textContent = c.certificate ? "Certificate of Completion Available" : "";

    /* ----------------------------------
       MEDIA & LESSONS LOGIC
    ---------------------------------- */
    mediaEl.innerHTML = "";
    lessonsEl.innerHTML = "";

    if (c.free === true) {

      /* VIDEO */
      if (c.video) {
        mediaEl.innerHTML += `
          <h3>🎥 Video Lesson</h3>
          <video controls width="100%">
            <source src="${c.video}">
          </video>
        `;
      }

      /* PDF */
      if (c.pdf) {
        mediaEl.innerHTML += `
          <h3>📄 Notes / PDF</h3>
          <a href="${c.pdf}" target="_blank" class="btn-open-course">
            Fungua PDF
          </a>
        `;
      }

      /* LESSONS */
      if (Array.isArray(c.lessons) && c.lessons.length > 0) {
        lessonsEl.innerHTML =
          `<h3>📚 Lessons</h3><ul>` +
          c.lessons.map(l => `<li>${l.title || "Lesson"}</li>`).join("") +
          `</ul>`;
      }

    } else {

      /* PAID COURSE (LOCKED) */
      mediaEl.innerHTML = `
        <div class="locked-box">
          <h3>🔒 Course Imefungwa</h3>
          <p>
            Hii ni course ya malipo.<br>
            Ili kuifungua, fuata hatua zilizo hapa chini.
          </p>
          <button id="payCourseBtn" class="btn-pay">
            Lipia Course
          </button>
        </div>
      `;

      lessonsEl.innerHTML = `
        <h3>📚 Lessons</h3>
        <p>🔒 Lessons zitafunguliwa baada ya malipo</p>
      `;

      /* PAY BUTTON LISTENER (SAFE) */
      const payBtn = document.getElementById("payCourseBtn");
      if (payBtn) {
        payBtn.addEventListener("click", () => {
          alert(`
Ili kulipia course:

1. Wasiliana na Admin: 0750 198 672
2. Fanya malipo
3. Course itafunguliwa kwenye akaunti yako

WhatsApp: 0620 198 672
`);
        });
      }
    }

  } catch (err) {
    console.error("🔥 Course load error:", err);
    titleEl.textContent = "⚠️ Kuna tatizo la kupakia course";
  }
}

/* ----------------------------------
   INIT
---------------------------------- */
loadCourse();

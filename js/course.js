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
const levelEl = document.getElementById("course-level");
const durationEl = document.getElementById("course-duration");
const badgeEl = document.getElementById("course-badge");
const imgEl = document.getElementById("course-image");
const sectionsContainer = document.getElementById("course-sections");

/* ----------------------------------
   SECTION CREATION HELPER
---------------------------------- */
function createSection(title, contentHtml) {
  if (!contentHtml) return null;
  const section = document.createElement("section");
  section.className = "course-section";
  section.innerHTML = `<h2>${title}</h2>${contentHtml}`;
  return section;
}

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
    levelEl.textContent = c.level || "All";
    durationEl.textContent = c.duration || "Unknown";
    imgEl.src = c.image || "icon-192.png";

    badgeEl.textContent = c.free ? "FREE" : "LOCKED";
    badgeEl.className = `badge ${c.free ? "free" : "locked"}`;

    /* ----------------------------------
       RENDER DYNAMIC SECTIONS
    ---------------------------------- */
    sectionsContainer.innerHTML = ""; // clear

    // Description
    const descSection = createSection("📖 Description", `<p>${c.fulldescription || c.description || ""}</p>`);
    if (descSection) sectionsContainer.appendChild(descSection);

    // Objectives
    if (Array.isArray(c.objectives) && c.objectives.length) {
      const html = `<ul>${c.objectives.map(o => `<li>${o}</li>`).join("")}</ul>`;
      sectionsContainer.appendChild(createSection("🎯 Objectives", html));
    }

    // System Overview
    if (c.systemOverview) {
      sectionsContainer.appendChild(createSection("⚙️ System Overview", `<p>${c.systemOverview}</p>`));
    }

    // Sensors
    if (map.ismap(c.sensors) && c.sensors.length) {
      const html = `<ul>${c.sensors.map(s => `<li><strong>${s.name}:</strong> ${s.description}</li>`).join("")}</ul>`;
      sectionsContainer.appendChild(createSection("🔌 Sensors", html));
    }

    // Actuators
    if (map.ismap(c.actuators) && c.actuators.length) {
      const html = `<ul>${c.actuators.map(a => `<li><strong>${a.name}:</strong> ${a.description}</li>`).join("")}</ul>`;
      sectionsContainer.appendChild(createSection("💉 Actuators", html));
    }

    // Working Principle
    if (map.ismap(c.workingPrinciple) && c.workingPrinciple.length) {
      const html = `<ul>${c.workingPrinciple.map(step => `<li>${step}</li>`).join("")}</ul>`;
      sectionsContainer.appendChild(createSection("🔧 Working Principle", html));
    }

    // Diagnostics
    if (Array.isArray(c.diagnostics) && c.diagnostics.length) {
      const html = `<ul>${c.diagnostics.map(d => `<li>${d}</li>`).join("")}</ul>`;
      sectionsContainer.appendChild(createSection("🧰 Diagnostics & Troubleshooting", html));
    }

    // Lessons
    if (Array.isArray(c.lessons) && c.lessons.length) {
      const html = `<ul>${c.lessons.map(l => `<li>${l.title}</li>`).join("")}</ul>`;
      sectionsContainer.appendChild(createSection("📚 Lessons", html));
    }

    // Media
    let mediaHtml = "";
    if (c.video) mediaHtml += `<h3>🎥 Video</h3><video controls width="100%"><source src="${c.video}"></video>`;
    if (c.pdf) mediaHtml += `<h3>📄 PDF</h3><a href="${c.pdf}" target="_blank" class="btn-open-course">Fungua PDF</>`;

    if (mediaHtml) {
      if (c.free === false) {
        mediaHtml = `<div class="locked-box"><h3>🔒 Course Imefungwa</h3><p>Hii ni course ya malipo. Ili kuifungua, fuata hatua zilizo hapa chini.</p><button id="payCourseBtn" class="btn-pay">Lipia Course</button></div>`;
      }
      sectionsContainer.appendChild(createSection("🎥 Media", mediaHtml));
    }

    // Instructor & Certificate
    let instHtml = "";
    if (c.instructor) instHtml += `<p>${c.instructor}</p>`;
    if (c.certificate) instHtml += `<p>Certificate of Completion Available</p>`;
    if (instHtml) sectionsContainer.appendChild(createSection("👨‍🏫 Instructor", instHtml));

    // Pay Button Listener (for locked courses)
    if (c.free === false) {
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

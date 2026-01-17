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
   SECTION HELPER
---------------------------------- */
function createSection(title, contentHtml) {
  if (!contentHtml || contentHtml.trim() === "") return null;
  const section = document.createElement("section");
  section.className = "course-section";
  section.innerHTML = `<h2>${title}</h2>${contentHtml}`;
  return section;
}

/* ----------------------------------
   HELPER: Render Arrays or Array of Objects
---------------------------------- */
function renderListObjects(data) {
  if (!data) return "<p>No content yet.</p>";

  // Array ya objects au strings
  if (Array.isArray(data) && data.length > 0) {
    return `<ul>${data.map(item => {
      if (item.name && item.description) {
        return `<li><strong>${item.name}:</strong> ${item.description}</li>`;
      } else if (item.title) {
        return `<li>${item.title}</li>`;
      } else if (typeof item === "string") {
        return `<li>${item}</li>`;
      } else {
        return `<li>${JSON.stringify(item)}</li>`;
      }
    }).join("")}</ul>`;
  }

  // Map / Object
  if (typeof data === "object") {
    return `<ul>${Object.values(data).map(item => {
      if (item.name && item.description) {
        return `<li><strong>${item.name}:</strong> ${item.description}</li>`;
      } else if (item.title) {
        return `<li>${item.title}</li>`;
      } else if (typeof item === "string") {
        return `<li>${item}</li>`;
      } else {
        return `<li>${JSON.stringify(item)}</li>`;
      }
    }).join("")}</ul>`;
  }

  return "<p>No content yet.</p>";
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
       RENDER SECTIONS
    ---------------------------------- */
    sectionsContainer.innerHTML = "";

    const sections = [
      createSection("📖 Description", `<p>${c.shortDescription || c.fullDescription || "No description yet."}</p>`),
      createSection("🎯 Objectives", renderListObjects(c.objectives)),
      createSection("⚙️ System Overview", `<p>${c.systemOverview || "No system overview yet."}</p>`),
      createSection("🔌 Sensors", renderListObjects(c.sensors)),
      createSection("💉 Actuators", renderListObjects(c.actuators)),
      createSection("🔧 Working Principle", renderListObjects(c.workingPrinciple)),
      createSection("🧰 Diagnostics & Troubleshooting", renderListObjects(c.diagnostics)),
      createSection("📚 Lessons", renderListObjects(c.lessons))
    ];

    sections.forEach(sec => { if (sec) sectionsContainer.appendChild(sec); });

    /* ----------------------------------
       MEDIA SECTION
    ---------------------------------- */
    let mediaHtml = "";
    if (c.free === true) {
      if (c.video) mediaHtml += `<h3>🎥 Video</h3><video controls width="100%"><source src="${c.video}"></video>`;
      if (c.pdf) mediaHtml += `<h3>📄 PDF</h3><a href="${c.pdf}" target="_blank" class="btn-open-course">Fungua PDF</a>`;
      if (!mediaHtml) mediaHtml = "<p>No media available.</p>";
    } else {
      mediaHtml = `<div class="locked-box"><h3>🔒 Course Imefungwa</h3><p>Hii ni course ya malipo. Ili kuifungua, fuata hatua zilizo hapa chini.</p><button id="payCourseBtn" class="btn-pay">Lipia Course</button></div>`;
    }

    const mediaSection = createSection("🎥 Media", mediaHtml);
    if (mediaSection) sectionsContainer.appendChild(mediaSection);

    /* ----------------------------------
       INSTRUCTOR & CERTIFICATE
    ---------------------------------- */
    let instHtml = "";
    if (c.instructor) instHtml += `<p>${c.instructor}</p>`;
    if (c.certificate) instHtml += `<p>Certificate of Completion Available</p>`;
    if (!instHtml) instHtml = `<p>No instructor info yet.</p>`;
    const instSection = createSection("👨‍🏫 Instructor", instHtml);
    if (instSection) sectionsContainer.appendChild(instSection);

    /* ----------------------------------
       PAY BUTTON LISTENER
    ---------------------------------- */
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

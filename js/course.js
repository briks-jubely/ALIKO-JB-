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
   HELPER: Render Array or Map
---------------------------------- */
function renderList(data, isMap = false) {
  if (!data) return "<p>No content yet.</p>";

  if (Array.isArray(data) && data.length > 0) {
    return `<ul>${data.map(item => {
      if (typeof item === "string") return `<li>${item}</li>`;
      if (item.title) return `<li>${item.title}</li>`;
      if (item.name && item.description) return `<li><strong>${item.name}:</strong> ${item.description}</li>`;
      return `<li>${JSON.stringify(item)}</li>`;
    }).join("")}</ul>`;
  }

  if (isMap && typeof data === "object") {
    const html = Object.values(data).map(item => {
      if (typeof item === "string") return `<li>${item}</li>`;
      if (item.name && item.description) return `<li><strong>${item.name}:</strong> ${item.description}</li>`;
      if (item.title) return `<li>${item.title}</li>`;
      return `<li>${JSON.stringify(item)}</li>`;
    }).join("");
    return `<ul>${html}</ul>`;
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
      createSection("📖 Description", `<p>${c.fullDescription || c.shortDescription || "No description yet."}</p>`),
      createSection("🎯 Objectives", renderList(c.objectives, false)),
      createSection("⚙️ System Overview", `<p>${c.systemOverview || "No system overview yet."}</p>`),
      createSection("🔌 Sensors", renderList(c.sensors, true)),
      createSection("💉 Actuators", renderList(c.actuators, true)),
      createSection("🔧 Working Principle", renderList(c.workingPrinciple, false)),
      createSection("🧰 Diagnostics & Troubleshooting", renderList(c.diagnostics, false)),
      createSection("📚 Lessons", renderList(c.lessons, true))
    ];

    // Append all non-null sections
    sections.forEach(sec => { if (sec) sectionsContainer.appendChild(sec); });

    // Media
    let mediaHtml = "";
    if (c.video) mediaHtml += `<h3>🎥 Video</h3><video controls width="100%"><source src="${c.video}"></video>`;
    if (c.pdf) mediaHtml += `<h3>📄 PDF</h3><a href="${c.pdf}" target="_blank" class="btn-open-course">Fungua PDF</a>`;
    if (!mediaHtml) mediaHtml = "<p>No media available.</p>";

    if (c.free === false) {
      mediaHtml = `<div class="locked-box"><h3>🔒 Course Imefungwa</h3><p>Hii ni course ya malipo. Ili kuifungua, fuata hatua zilizo hapa chini.</p><button id="payCourseBtn" class="btn-pay">Lipia Course</button></div>`;
    }

    const mediaSection = createSection("🎥 Media", mediaHtml);
    if (mediaSection) sectionsContainer.appendChild(mediaSection);

    // Instructor & Certificate
    let instHtml = "";
    if (c.instructor) instHtml += `<p>${c.instructor}</p>`;
    if (c.certificate) instHtml += `<p>Certificate of Completion Available</p>`;
    if (!instHtml) instHtml = `<p>No instructor info yet.</p>`;
    const instSection = createSection("👨‍🏫 Instructor", instHtml);
    if (instSection) sectionsContainer.appendChild(instSection);

    // Pay button listener
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

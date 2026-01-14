import { db } from "./auth.js";
import {
  collection,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let unsubscribeCourses = null;

export function loadCourses(container, statusEl) {
  console.log("🚀 loadCourses initialized");

  // Cleanup previous listener
  if (unsubscribeCourses) unsubscribeCourses();

  // Clear container and show loading
  statusEl.textContent = "Loading courses...";
  container.innerHTML = "";

  // Firestore query
  const q = query(
    collection(db, "courses"),
    where("published", "==", true)
  );

  unsubscribeCourses = onSnapshot(q, (snapshot) => {
    container.innerHTML = "";

    if (snapshot.empty) {
      statusEl.textContent = "Hakuna kozi zilizopo kwa sasa";
      return;
    }

    statusEl.textContent = "";

    snapshot.forEach(doc => {
      const c = doc.data();

      const card = document.createElement("div");
      card.className = "course-card";
      card.dataset.courseId = doc.id;
      card.dataset.type = c.type || "course";
      card.dataset.free = c.free ? "true" : "false";

      if (c.video) card.dataset.video = c.video;
      if (c.pdf) card.dataset.pdf = c.pdf;

      card.innerHTML = `
        <img src="${c.image || 'icon-192.png'}" class="course-img">
        <div class="course-content">
          <span class="badge ${c.free ? 'free' : 'locked'}">
            ${c.free ? 'FREE' : 'LOCKED'}
          </span>
          <h3>${c.title}</h3>
          <p>${c.description}</p>
          <div class="course-meta">
            Level: ${c.level || "All"} • ${c.duration || ""}
          </div>
          <div class="course-actions">
            ${c.video ? `<button class="btn-video">Watch Video</button>` : ""}
            ${c.pdf ? `<button class="btn-pdf">View PDF</button>` : ""}
            <button class="btn-vote">👍 Vote</button>
            <button class="btn-open-course">
        Fungua Kozi
      </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Dispatch event after cards loaded
    document.dispatchEvent(new CustomEvent("coursesLoaded"));

  }, (err) => {
    console.error("🔥 Firestore snapshot error:", err);
    statusEl.textContent = "Imeshindikana kupakua kozi";
  });

  // -----------------------------
  // Event Delegation: Click on any course-card
  // -----------------------------
  container.addEventListener("click", (e) => {
  const card = e.target.closest(".course-card");
  if (!card) return;

  // HII NDIO ID HALISI YA CARD HIYO
  const courseId = card.dataset.courseId;

  if (!courseId) {
    console.error("❌ courseId haipo kwenye card");
    return;
  }

  // BUTTON: Fungua Kozi
  if (e.target.classList.contains("btn-open-course")) {
    window.location.href = `course.html?courseId=${courseId}`;
    return;
  }

  // Ignore buttons nyingine
  if (e.target.tagName === "BUTTON") return;

  // CLICK POPOTE KWENYE CARD
  window.location.href = `course.html?courseId=${courseId}`;
});
  return unsubscribeCourses;
        }

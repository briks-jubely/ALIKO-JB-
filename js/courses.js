// js/courses.js
import { db } from "./auth.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let unsubscribeCourses = null; // for safe unsubscribe

export function loadCourses(container, statusEl) {
  console.log("🚀 loadCourses initialized");

  // Clear previous listener if exists
  if (unsubscribeCourses) {
    console.log("🧹 Unsubscribing previous snapshot listener");
    unsubscribeCourses();
  }

  statusEl.textContent = "Loading courses...";
  container.innerHTML = "";

  // Setup query
  const q = query(
  collection(db, "courses"),
  where("published", "==", true)
);
  // Attach listener
  unsubscribeCourses = onSnapshot(q, (snapshot) => {
    console.log("📦 snapshot received, size:", snapshot.size);

    container.innerHTML = "";

    if (snapshot.empty) {
      statusEl.textContent = "Hakuna kozi zilizopo kwa sasa";
      console.warn("⚠️ Firestore returned empty snapshot. Check index & query.");
      return;
    }

    statusEl.textContent = "";

    snapshot.forEach(doc => {
      const c = doc.data();
      console.log("📝 Course:", c.title, c);

      const card = document.createElement("div");
      card.className = "course-card";

      card.innerHTML = `
        <img src="${c.image || 'icon-192.png'}">
        <div class="course-content">
          <span class="badge ${c.free ? 'free' : 'locked'}">
            ${c.free ? 'FREE' : 'LOCKED'}
          </span>
          <h3>${c.title}</h3>
          <p>${c.description}</p>
          <div class="course-meta">
            Level: ${c.level || "All"} • ${c.duration || ""}
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  }, (err) => {
    console.error("🔥 Firestore snapshot error:", err);
    statusEl.textContent = "Imeshindikana kupakua kozi";
  });
}

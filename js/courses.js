// js/courses.js
import { db } from "./auth.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

export function loadCourses(container, statusEl) {
  console.log("🚀 loadCourses initialized");

  statusEl.textContent = "Loading courses...";
  container.innerHTML = "";

  // Hakikisha una data kwa format sahihi
  const coursesRef = collection(db, "courses");
  const q = query(
    coursesRef,
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );

  // onSnapshot inarun na return unsubscribe function
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      console.log("📦 snapshot size:", snapshot.size);
      container.innerHTML = "";

      if (snapshot.empty) {
        statusEl.textContent = "Hakuna kozi zilizopo kwa sasa";
        return;
      }

      statusEl.textContent = "";

      snapshot.forEach((doc) => {
        const c = doc.data();

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
    },
    (error) => {
      console.error("Firestore snapshot error:", error);
      statusEl.textContent = "Tatizo ku-load courses, angalia console.";
    }
  );

  // Return unsubscribe ili tuweze clean up
  return unsubscribe;
}

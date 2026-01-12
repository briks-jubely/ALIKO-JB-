// js/courses.js
import { db } from "./auth.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

export function loadCourses(container, statusEl) {
  console.log("🚀 loadCourses RUNNING");

  statusEl.textContent = "Loading courses...";
  container.innerHTML = "";

  const ref = collection(db, "courses");

  onSnapshot(
    ref,
    (snapshot) => {
      console.log("📦 snapshot size:", snapshot.size);

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
        card.innerHTML = `
          <h3>${c.title}</h3>
          <p>${c.description}</p>
        `;
        container.appendChild(card);
      });
    },
    (error) => {
      console.error("🔥 Firestore error:", error);
      statusEl.textContent = "Error loading courses";
    }
  );
        }

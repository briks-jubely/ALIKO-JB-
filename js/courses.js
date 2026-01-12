import { db } from "./auth.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let unsubscribeCourses = null;

export function loadCourses(container, statusEl) {
  console.log("🚀 loadCourses RUNNING");

  statusEl.textContent = "Loading courses...";
  container.innerHTML = "";

  // 🔴 ZIMA LISTENER YA ZAMANI KAMA IPO
  if (unsubscribeCourses) {
    unsubscribeCourses();
  }

  const q = query(
    collection(db, "courses"),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );

  unsubscribeCourses = onSnapshot(
    q,
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
      console.error("🔥 Firestore error:", error);
      statusEl.textContent = "Failed to load courses";
    }
  );
          }

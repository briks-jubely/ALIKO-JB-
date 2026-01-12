// js/courses.js
import { db } from "./auth.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let unsubscribeCourses = null;

export async function loadCourses(container, statusEl) {
  console.log("🚀 loadCourses initialized");

  if (unsubscribeCourses) {
    console.log("🧹 Unsubscribing previous snapshot listener");
    unsubscribeCourses();
  }

  statusEl.textContent = "Loading courses...";
  container.innerHTML = "";

  const q = query(
    collection(db, "courses"),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );

  // **Step 1: Test query with getDocs for index check**
  try {
    const testSnap = await getDocs(q);
    console.log("✅ getDocs test snapshot size:", testSnap.size);
    if (testSnap.empty) {
      console.warn("⚠️ Firestore test snapshot empty. Check if data matches query conditions.");
    }
  } catch (err) {
    console.error("🔥 Firestore index/test error:", err);
    console.warn("💡 If this is a 'requires index' error, follow the link Firestore provides in console to create index.");
  }

  // **Step 2: Live snapshot listener**
  unsubscribeCourses = onSnapshot(q, (snapshot) => {
    console.log("📦 snapshot received, size:", snapshot.size);

    container.innerHTML = "";

    if (snapshot.empty) {
      statusEl.textContent = "Hakuna kozi zilizopo kwa sasa";
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

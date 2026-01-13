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
  console.log("🚀 loadCourses initialized");

  if (unsubscribeCourses) unsubscribeCourses();

  statusEl.textContent = "Loading courses...";
  container.innerHTML = "";

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

      card.dataset.courseId = doc.id; // 🔑 store course id for interactions
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
          </div>
        </div>
      `;
card.dataset.courseId = doc.id;
     card.dataset.type = c.type || "course"; 

if (c.video) card.dataset.video = c.video;
if (c.pdf) card.dataset.pdf = c.pdf;
card.dataset.free = c.free ? "true" : "false";
if (card.dataset.type === "course") {
  card.addEventListener("click", () => {
    window.location.href = `course.html?courseId=${doc.id}`;
  });
  }
      
      container.appendChild(card);
    });

 document.dispatchEvent(new CustomEvent("coursesLoaded"));   
  }, (err) => {
    console.error("🔥 Firestore snapshot error:", err);
    statusEl.textContent = "Imeshindikana kupakua kozi";
  });

  return unsubscribeCourses; // 🔑 return unsubscribe for cleanup
                                          }

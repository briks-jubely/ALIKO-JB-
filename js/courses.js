import { db } from "./auth.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* ======================
   LOAD COURSES (LIVE)
====================== */
export function loadCourses(container, statusMsg) {
  if (!container) return;

  statusMsg.textContent = "Loading courses...";
  container.innerHTML = "";

  const q = query(
    collection(db, "courses"),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );

  onSnapshot(
    q,
    (snapshot) => {
      container.innerHTML = "";

      if (snapshot.empty) {
        statusMsg.textContent = "Hakuna courses kwa sasa.";
        return;
      }

      statusMsg.textContent = "";

      snapshot.forEach(doc => {
        const course = doc.data();

        const card = document.createElement("div");
        card.className = "course-card";

        card.innerHTML = `
          <img src="${course.image}" alt="${course.title}">
          <div class="course-content">
            <span class="badge ${course.free ? "free" : "locked"}">
              ${course.free ? "FREE" : "LOCKED"}
            </span>

            <h3>${course.title}</h3>
            <p>${course.description}</p>

            <div class="course-meta">
              Level: ${course.level} • Duration: ${course.duration}
            </div>
          </div>
        `;

        card.addEventListener("click", () => {
          if (!course.free) {
            alert("🔒 Course hii ni paid. Itafunguliwa hivi karibuni.");
            return;
          }

          alert(`📘 Opening course: ${course.title}`);
          // baadaye:
          // location.href = `course.html?id=${doc.id}`;
        });

        container.appendChild(card);
      });
    },
    (error) => {
      console.error(error);
      statusMsg.textContent = "Imeshindikana kupakia courses.";
    }
  );
}

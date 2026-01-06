// courses.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// 🔹 FIREBASE CONFIG YAKO (ULIYOITUMA)
const firebaseConfig = {
  apiKey: "AIzaSyAZDwTWKduwhVD9lDNcin_ZCur4kMlWkUA",
  authDomain: "aliko-jb-academy.firebaseapp.com",
  projectId: "aliko-jb-academy",
  storageBucket: "aliko-jb-academy.firebasestorage.app",
  messagingSenderId: "282712708896",
  appId: "1:282712708896:web:c526d620f468a233f82945"
};

// 🔹 INIT FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 DOM READY
document.addEventListener("DOMContentLoaded", loadCourses);

// 🔹 LOAD COURSES
async function loadCourses() {
  console.log("loadCourses() imeitwa");

  const container = document.getElementById("coursesContainer");
  if (!container) {
    console.error("coursesContainer haipo");
    return;
  }

  container.innerHTML = "Loading courses...";

  try {
    const snapshot = await getDocs(collection(db, "courses"));
    console.log("Courses found:", snapshot.size);

    if (snapshot.empty) {
      container.innerHTML = "Hakuna kozi zilizopo.";
      return;
    }

    container.innerHTML = "";

    snapshot.forEach((doc) => {
      const course = doc.data();

      const card = document.createElement("div");
      card.style.border = "1px solid #ccc";
      card.style.padding = "10px";
      card.style.marginBottom = "10px";

      card.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <p><strong>Type:</strong> ${course.paid ? "Paid" : "Free"}</p>
        ${
          course.paid
            ? `<p><strong>Price:</strong> TZS ${course.price}</p>`
            : ""
        }
        <button>${course.paid ? "Buy Course" : "Start Learning"}</button>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading courses:", error);
    container.innerHTML = "Error loading courses.";
  }
    }

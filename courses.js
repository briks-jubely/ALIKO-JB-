import { initializeApp } from "...firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "...firebase-auth.js";
import { getFirestore, collection, getDocs } from "...firebase-firestore.js";

const firebaseConfig = { /* config yako */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const coursesContainer = document.getElementById("coursesContainer");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadCourses();
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

async function loadCourses() {
  const status = document.getElementById("status");
  coursesContainer.innerHTML = "";
  status.textContent = "Loading courses...";

  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    if (querySnapshot.empty) {
      status.textContent = "No courses found in Firestore";
      return;
    }
    status.textContent = "";
    querySnapshot.forEach((doc) => {
      const course = doc.data();
      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `
        <h3>${course.title || "No title"}</h3>
        <p>${course.description || ""}</p>
        <p><strong>Price:</strong> ${course.price ?? "Free"}</p>
      `;
      coursesContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading courses:", error);
    status.textContent = "Error loading courses";
  }
      }

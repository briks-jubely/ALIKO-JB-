import { auth } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* Academy button */
const academyBtn = document.getElementById("academyBtn");

/* Workshop button */
const workshopBtn = document.getElementById("workshopBtn");

function goAcademy() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "academy.html";
    } else {
      window.location.href = "login.html";
    }
  });
}

function goWorkshop() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "workshop.html";
    } else {
      window.location.href = "login.html";
    }
  });
}

academyBtn?.addEventListener("click", goAcademy);
workshopBtn?.addEventListener("click", goWorkshop);

// js/auth.js
alert("auth.js (Firebase) loaded");

import { auth, db } from "../firebase/firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ==========================
   FORM SWITCHING (UNCHANGED)
========================== */
window.showLogin = function () {
  loginForm.classList.add("active");
  regForm.classList.remove("active");
  loginTab.classList.add("active");
  regTab.classList.remove("active");
};

window.showRegister = function () {
  regForm.classList.add("active");
  loginForm.classList.remove("active");
  regTab.classList.add("active");
  loginTab.classList.remove("active");
};

/* ==========================
   REGISTER USER (FIREBASE)
========================== */
window.registerUser = async function () {
  const name = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const regMsg = document.getElementById("regMsg");

  if (!name || !email || !password) {
    regMsg.textContent = "Fill all fields";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      name: name,
      email: email,
      role: "student", // default
      createdAt: serverTimestamp()
    });

    regMsg.textContent = "Account created successfully!";
    regMsg.className = "msg success";

    setTimeout(() => {
      window.location.href = "academy.html";
    }, 800);

  } catch (e) {
    regMsg.textContent = e.message;
  }
};

/* ==========================
   LOGIN USER (FIREBASE)
========================== */
window.loginUser = async function () {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const loginMsg = document.getElementById("loginMsg");

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    const snap = await getDoc(doc(db, "users", cred.user.uid));
    const role = snap.data().role;

    if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "academy.html";
    }

  } catch (e) {
    loginMsg.textContent = "Invalid email or password";
  }
};

/* ==========================
   LOGOUT USER
========================== */
window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};

/* ==========================
   AUTH GUARD (AUTO CHECK)
========================== */
onAuthStateChanged(auth, (user) => {
  if (!user && !location.pathname.includes("login")) {
    location.href = "login.html";
  }
});

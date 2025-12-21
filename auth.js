// js/auth.js
console.log("auth.js loaded");

import { auth, db } from "firebase.js";

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

/* DOM */
const loginForm = document.getElementById("loginForm");
const regForm = document.getElementById("regForm");
const loginTab = document.getElementById("loginTab");
const regTab = document.getElementById("regTab");

/* FORM SWITCH */
window.showLogin = () => {
  loginForm.classList.add("active");
  regForm.classList.remove("active");
  loginTab.classList.add("active");
  regTab.classList.remove("active");
};

window.showRegister = () => {
  regForm.classList.add("active");
  loginForm.classList.remove("active");
  regTab.classList.add("active");
  loginTab.classList.remove("active");
};

/* REGISTER */
window.registerUser = async () => {
  const name = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const msg = document.getElementById("regMsg");

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      role: "student",
      createdAt: serverTimestamp()
    });

    msg.textContent = "Account created successfully";
    msg.className = "msg success";

    setTimeout(() => {
      location.href = "academy.html";
    }, 800);

  } catch (e) {
    msg.textContent = e.message;
  }
};

/* LOGIN */
window.loginUser = async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const msg = document.getElementById("loginMsg");

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", cred.user.uid));

    if (snap.exists() && snap.data().role === "admin") {
      location.href = "admin.html";
    } else {
      location.href = "academy.html";
    }

  } catch (e) {
    msg.textContent = "Email or password incorrect";
  }
};

/* LOGOUT */
window.logout = async () => {
  await signOut(auth);
  location.href = "login.html";
};

/* AUTH GUARD */
onAuthStateChanged(auth, (user) => {
  if (!user && !location.pathname.includes("login")) {
    location.href = "login.html";
  }
});

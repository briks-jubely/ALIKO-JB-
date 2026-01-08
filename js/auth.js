// js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyAZDwTWKduwhVD9lDNcin_ZCur4kMlWkUA",
  authDomain: "aliko-jb-academy.firebaseapp.com",
  projectId: "aliko-jb-academy",
  storageBucket: "aliko-jb-academy.firebasestorage.app",
  messagingSenderId: "282712708896",
  appId: "1:282712708896:web:c526d620f468a233f82945"
};

/* 🔧 INIT */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* 📝 REGISTER */
export async function registerUser({ name, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    role: "student",
    createdAt: serverTimestamp()
  });

  return cred.user;
}

/* 🔑 LOGIN */
export async function loginUser({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  const snap = await getDoc(doc(db, "users", cred.user.uid));
  if (!snap.exists()) {
    throw new Error("User profile not found");
  }

  return {
    user: cred.user,
    profile: snap.data()
  };
}

/* 🚪 LOGOUT */
export async function logoutUser() {
  await signOut(auth);
}

/* 👁️ AUTH OBSERVER */
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

export function watchAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

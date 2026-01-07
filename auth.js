// auth.js
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// REGISTER
export async function registerUser(email, password, name) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        role: "student",
        createdAt: serverTimestamp()
    });
    return cred.user;
}

// LOGIN
export async function loginUser(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", cred.user.uid));
    return { user: cred.user, role: snap.data().role };
}

// LOGOUT
export async function logoutUser() {
    await signOut(auth);
}

// AUTH OBSERVER
export function observeAuth(callback) {
    onAuthStateChanged(auth, callback);
}

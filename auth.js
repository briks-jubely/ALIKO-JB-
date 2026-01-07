// js/auth.js

import { auth, db } from "./firebase.js";

import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {

doc,

setDoc,

getDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* REGISTER */

export async function registerUser(name, email, password) {

const cred = await createUserWithEmailAndPassword(auth, email, password);

await setDoc(doc(db, "users", cred.user.uid), {

name,

email,

role: "student",

createdAt: serverTimestamp()

});

return cred.user;

}

/* LOGIN */

export async function loginUser(email, password) {

const cred = await signInWithEmailAndPassword(auth, email, password);

const snap = await getDoc(doc(db, "users", cred.user.uid));

return snap.exists() ? snap.data() : null;

}

/* LOGOUT */

export function logoutUser() {

return signOut(auth);

}

/* AUTH WATCHER */

export function watchAuth(callback) {

return onAuthStateChanged(auth, callback);

  }

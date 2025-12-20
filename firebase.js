// firebase/firebase.js

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZDwTWKduwhVD9lDNcin_ZCur4kMlWkUA",
  authDomain: "aliko-jb-academy.firebaseapp.com",
  projectId: "aliko-jb-academy",
  storageBucket: "aliko-jb-academy.appspot.com",
  messagingSenderId: "282712708896",
  appId: "1:282712708896:web:c526d620f468a233f82945"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

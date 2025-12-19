<!-- firebase/firebase.js -->
<script type="module">
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZDwTWKduwhVD9lDNcin_ZCur4kMlWkUA",
  authDomain: "aliko-jb-academy.firebaseapp.com",
  projectId: "aliko-jb-academy",
  storageBucket: "aliko-jb-academy.firebasestorage.app",
  messagingSenderId: "282712708896",
  appId: "1:282712708896:web:c526d620f468a233f82945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  window.db = getFirestore(app);
</script>

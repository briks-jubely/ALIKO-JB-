<script type="module">
import { collection, getDocs } from 
"https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

async function loadCourses() {
  const courseContainer = document.getElementById("courses");
  courseContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "courses"));

  querySnapshot.forEach((doc) => {
    const c = doc.data();

    courseContainer.innerHTML += `
      <div class="card">
        <img src="${c.image}">
        <span class="badge ${c.status}">${c.status.toUpperCase()}</span>
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <small>Level: ${c.level}</small>
      </div>
    `;
  });
}

loadCourses();
</script>

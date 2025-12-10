function loginUser(e) {
  e.preventDefault(); // 🚨 HII NDIO MUHIMU

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("Invalid username or password");
    return;
  }

  localStorage.setItem("loggedInUser", username);
  window.location.href = "academy.html";
}

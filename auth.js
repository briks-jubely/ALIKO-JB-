function loginUser(e) {
  if (e) e.preventDefault();

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

  // 🔹 MREKEBISHO MUHIMU
  localStorage.setItem("loggedInUser", username);
  localStorage.setItem("loggedIn", "true");

  window.location.href = "academy.html";
}

function registerUser(e) {
  if (e) e.preventDefault();

  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.username === username)) {
    alert("Mtumiaji tayari yupo");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Usajili umefanikiwa");
  window.location.href = "login.html";
        }

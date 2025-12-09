document.getElementById("loginForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  // SAMPLE ACCOUNT (mock)
  if(user === "student" && pass === "1234"){
    localStorage.setItem("loggedIn", "yes");
    window.location.href = "app.html";
  } else {
    document.getElementById("loginMsg").innerText = "Invalid login details";
  }
});

function login(){
  const user = loginUser.value.trim();
  const pass = loginPass.value.trim();
  const users = JSON.parse(localStorage.getItem("users"));

  const found = users.find(u=>u.username===user && u.password===pass);

  if(!found){
    loginMsg.textContent = "Invalid username or password";
    return;
  }

  localStorage.setItem("loggedInUser", found.username);
  localStorage.setItem("currentUser", JSON.stringify(found));

  window.location.href = "academy.html";
}

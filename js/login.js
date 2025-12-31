const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submitBtn = document.querySelector("#submit-btn");
const errorMessage = document.querySelector("#error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = Object.fromEntries(data);
  const user = {
    email: obj.email,
    password: obj.password,
  };
  loginUser(user);
});

function loginUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) ?? [];
  const validUser = users.find(
    (u) => u.email === user.email && u.password === user.password
  );

  console.log(validUser);
  
  if (!validUser) {
    errorMessage.style.visibility = "visible";
    return
  }
  window.location.href = "index.html";
  localStorage.setItem("user", JSON.stringify(validUser));
}
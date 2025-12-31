const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirm-password");
const submitBtn = document.querySelector("#submit-btn");

const formState = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = Object.fromEntries(data);
  const user = {
    name: obj.name,
    email: obj.email,
    password: obj.password,
  };
  registerUser(user);
});

function registerUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) ?? [];
  const isEmailUnique = users.every((u) => u.email !== user.email);
  if (!isEmailUnique) {
        toggle(
          document.querySelector('#email-req [data-rule="unique"]'),
          isEmailUnique
        );
    updateSubmitState()
    return;
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "login.html";
}

function toggle(element, condition) {
  element.classList.toggle("valid", condition);
}

function updateSubmitState() {
  submitBtn.disabled = !Object.values(formState).every(Boolean);
}

nameInput.addEventListener("input", () => {
  const value = nameInput.value.trim();
  const validation = {
    min: value.length >= 5,
  };
  toggle(document.querySelector('#name-req [data-rule="min"]'), validation.min);
  formState.name = validation.min;
  updateSubmitState();
});

emailInput.addEventListener("input", () => {
  const validation = {
    format: emailInput.checkValidity(),
    unique: true,
 };
  toggle(
    document.querySelector('#email-req [data-rule="format"]'),
    validation.format
  );
  toggle(
    document.querySelector('#email-req [data-rule="unique"]'),
    validation.unique
  )
  formState.email = validation.format;
  updateSubmitState();
});

passwordInput.addEventListener("input", () => {
  const v = passwordInput.value;
  const validation = {
    length: v.length >= 8,
    upper: /[A-Z]/.test(v),
    lower: /[a-z]/.test(v),
    special: /[!@#$%^&*]/.test(v),
  };
  toggle(
    document.querySelector('#password-req [data-rule="length"]'),
    validation.length
  );
  toggle(
    document.querySelector('#password-req [data-rule="upper"]'),
    validation.upper
  );
  toggle(
    document.querySelector('#password-req [data-rule="lower"]'),
    validation.lower
  );
  toggle(
    document.querySelector('#password-req [data-rule="special"]'),
    validation.special
  );
  formState.password = Object.values(validation).every((v) => v);
  updateSubmitState();
});

confirmInput.addEventListener("input", () => {
  const validation = {
    match:
      confirmInput.value === passwordInput.value && confirmInput.value !== "",
  };
  toggle(
    document.querySelector('#confirm-req [data-rule="match"]'),
    validation.match
  );
  formState.confirmPassword = validation.match;
  updateSubmitState();
});

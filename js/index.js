// ========== DOM Elements ==========
const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const registerForm = document.getElementById("registerForm");
const registerUsername = document.getElementById("regUsername");
const registerPassword = document.getElementById("regPassword");
const registerEmail = document.getElementById("regEmail");

const logoutButton = document.getElementById("logoutButton");
const welcomeElement = document.getElementById("welcomename");

let Emails = JSON.parse(localStorage.getItem("Emails")) || [];

function registerUser(event) {
  event.preventDefault();
  const newUser = {
    email: registerEmail.value,
    username: registerUsername.value,
    password: registerPassword.value,
  };
  const messageElement = document.getElementById("loginsuccessfully");
  if (Emails.some((user) => user.email === newUser.email)) {
    messageElement.classList.remove("visually-hidden");
    messageElement.classList.add("text-danger");
    messageElement.textContent = "Email already exists";
    return;
  }
  Emails.push(newUser);
  localStorage.setItem("Emails", JSON.stringify(Emails));
  messageElement.classList.remove("visually-hidden", "text-danger");
  //messageElement.classList.add("text-success");
  messageElement.textContent = "Registration successful!";
  registerForm.reset();
}
function login(event) {
  event.preventDefault();

  const username = loginUsername.value;
  const password = loginPassword.value;

  const matchedUser = Emails.find(
    (user) => user.email === username && user.password === password
  );
  const msgElement = document.getElementById("loginInvalid");
  if (matchedUser) {
    localStorage.setItem("loggedInUser", matchedUser.username); // Save username
    window.location.href = "pages/Welcomepage.html"; // Redirect
  } else {
    msgElement.classList.remove("visually-hidden");
    msgElement.classList.add("text-danger");
    msgElement.textContent = "Invalid username or password";
  }
}
function displayWelcomeName() {
  const username = localStorage.getItem("loggedInUser");
  if (welcomeElement && username) {
    welcomeElement.textContent = `Welcome ${username}`;
  } else if (welcomeElement && !username) {
    window.location.href = "../index.html";
  }
}
function handleLogout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
}
window.addEventListener("DOMContentLoaded", () => {
  if (loginForm) loginForm.addEventListener("submit", login);
  if (registerForm) registerForm.addEventListener("submit", registerUser);
  if (logoutButton) logoutButton.addEventListener("click", handleLogout);
  displayWelcomeName();
});

// firebase-auth.js functionality integrated
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Firebase config - replace with your actual credentials
const firebaseConfig = {
  apiKey: "AIzaSyAv75ZIf2YHovSBxPE7fAZZfzItXMYPUDI",
  authDomain: "mindease-f3641.firebaseapp.com",
  projectId: "mindease-f3641",
  storageBucket: "mindease-f3641.firebasestorage.app",
  messagingSenderId: "683571418303",
  appId: "1:683571418303:web:56183c8b6b48d2dfaa220a",
  measurementId: "G-NYJV83S884"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements for login
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginModal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close-btn");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("error-msg");

// Show/Hide Modal
loginBtn.addEventListener("click", () => loginModal.style.display = "flex");
closeBtn.addEventListener("click", () => loginModal.style.display = "none");
window.addEventListener("click", e => { if(e.target == loginModal) loginModal.style.display = "none"; });

// Sign In
signInBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => { loginModal.style.display = "none"; errorMsg.textContent = ""; })
    .catch(error => { errorMsg.textContent = error.message; });
});

// Sign Up
signUpBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => { loginModal.style.display = "none"; errorMsg.textContent = ""; })
    .catch(error => { errorMsg.textContent = error.message; });
});

// Logout
logoutBtn.addEventListener("click", () => signOut(auth));

// Update header buttons based on auth state
onAuthStateChanged(auth, user => {
  if(user){
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});

// FAQ Toggle
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => item.classList.toggle("active"));
});

// Sleep Check (from Code 1)
const sleepInput = document.getElementById('sleepHours');
const checkBtn = document.getElementById('checkSleep');
const sleepResult = document.getElementById('sleepResult');

if (checkBtn) { // ensure element exists
  checkBtn.addEventListener('click', () => {
    const hours = parseFloat(sleepInput.value);
    if (isNaN(hours) || hours < 0 || hours > 24) {
      sleepResult.textContent = "Please enter a valid number of hours between 0 and 24.";
      return;
    }
    if (hours < 5) sleepResult.textContent = `You slept ${hours} hours. That's not enough sleep 😴. Try to get at least 7–9 hours for better health.`;
    else if (hours <= 7) sleepResult.textContent = `You slept ${hours} hours. Not bad, but aim for 7–9 hours to feel fully rested.`;
    else if (hours <= 9) sleepResult.textContent = `You slept ${hours} hours. Perfect! Your sleep duration is ideal 🌙.`;
    else sleepResult.textContent = `You slept ${hours} hours. That's more than recommended. Too much sleep can also affect your health.`;
  });
}

// Blog "Explore More" toggle
const exploreBtn = document.getElementById("explore-btn");
const moreBlogs = document.querySelector(".more-blogs");

if (exploreBtn && moreBlogs) {
  exploreBtn.addEventListener("click", () => {
    moreBlogs.classList.toggle("hidden");
    exploreBtn.textContent = moreBlogs.classList.contains("hidden") ? "✨ Explore More" : "↑ Show Less";
  });
}

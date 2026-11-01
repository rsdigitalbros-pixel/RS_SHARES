import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail,
  signOut, updateProfile
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const $ = (id) => document.getElementById(id);
const message = $("auth-message");
let mode = "signin";

function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = `auth-message show${isError ? " error" : ""}`;
}
function clearMessage() { message.textContent = ""; message.className = "auth-message"; }
function setMode(nextMode) {
  mode = nextMode;
  clearMessage();
  const signup = mode === "signup";
  $("signin-tab").classList.toggle("active", !signup);
  $("signup-tab").classList.toggle("active", signup);
  $("name-wrap").hidden = !signup;
  $("full-name").required = signup;
  $("auth-title").innerHTML = signup ? "Create your <em>account.</em>" : "Welcome <em>back.</em>";
  $("auth-sub").textContent = signup ? "Create an account to connect with RS Digital Marketing." : "Sign in to your RS Digital Marketing account.";
  $("submit-btn").textContent = signup ? "Create account & verify email" : "Sign in";
  $("password").autocomplete = signup ? "new-password" : "current-password";
  $("reset-btn").hidden = signup;
}
$("signin-tab").addEventListener("click", () => setMode("signin"));
$("signup-tab").addEventListener("click", () => setMode("signup"));

const configured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("PASTE_")
  && firebaseConfig.projectId && !firebaseConfig.projectId.startsWith("PASTE_")
  && firebaseConfig.appId && !firebaseConfig.appId.startsWith("PASTE_");

let auth = null;
let googleProvider = null;
if (configured) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });
} else {
  showMessage("Firebase setup is not finished yet. Follow the Firebase setup steps in README-BANGLA.txt, then fill assets/js/firebase-config.js.", true);
  $("submit-btn").disabled = true;
  $("google-btn").disabled = true;
}

$("auth-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!auth) return;
  clearMessage();
  const email = $("email").value.trim();
  const password = $("password").value;
  $("submit-btn").disabled = true;
  try {
    if (mode === "signup") {
      const name = $("full-name").value.trim();
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(credential.user, { displayName: name });
      await sendEmailVerification(credential.user);
      await signOut(auth);
      $("auth-form").reset();
      showMessage("Account created! A verification link has been sent to your email. Open that email and verify your address, then return here to sign in.");
    } else {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      if (!credential.user.emailVerified) {
        await sendEmailVerification(credential.user);
        await signOut(auth);
        showMessage("Your email is not verified yet. We sent a new verification link. Verify your email, then sign in again.", true);
      } else {
        showMessage("You are signed in successfully. Welcome to RS Digital Marketing!");
      }
    }
  } catch (error) {
    const messages = {
      "auth/email-already-in-use": "This email already has an account. Please sign in.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Choose a stronger password with at least 6 characters.",
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/user-not-found": "No account was found for this email.",
      "auth/too-many-requests": "Too many attempts. Please wait and try again.",
      "auth/popup-closed-by-user": "Google sign-in was closed before finishing.",
      "auth/unauthorized-domain": "This website domain is not authorized in Firebase Authentication settings."
    };
    showMessage(messages[error.code] || `Could not complete sign-in: ${error.message}`, true);
  } finally {
    $("submit-btn").disabled = false;
  }
});

$("google-btn").addEventListener("click", async () => {
  if (!auth) return;
  clearMessage();
  $("google-btn").disabled = true;
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user.emailVerified) showMessage("Google sign-in successful. Welcome to RS Digital Marketing!");
    else showMessage("Please verify your Google account email before continuing.", true);
  } catch (error) {
    showMessage(error.code === "auth/unauthorized-domain"
      ? "This website domain is not authorized in Firebase. Add it in Authentication > Settings > Authorized domains."
      : `Google sign-in could not finish: ${error.message}`, true);
  } finally {
    $("google-btn").disabled = false;
  }
});

$("reset-btn").addEventListener("click", async () => {
  if (!auth) return;
  const email = $("email").value.trim();
  if (!email) { showMessage("Enter your email address first, then click Forgot password.", true); return; }
  try {
    await sendPasswordResetEmail(auth, email);
    showMessage("If an account exists for this email, a password reset link has been sent. Check your inbox and spam folder.");
  } catch (error) {
    showMessage(error.code === "auth/invalid-email" ? "Please enter a valid email address." : "Could not send the reset email. Please try again.", true);
  }
});

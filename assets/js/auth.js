```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import { firebaseConfig } from "./firebase-config.js";

const $ = (id) => document.getElementById(id);

const message = $("auth-message");
let mode = "signin";

function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = `auth-message show${isError ? " error" : ""}`;
}

function clearMessage() {
  message.textContent = "";
  message.className = "auth-message";
}

function setMode(nextMode) {
  mode = nextMode;
  clearMessage();

  const signup = mode === "signup";

  $("signin-tab").classList.toggle("active", !signup);
  $("signup-tab").classList.toggle("active", signup);
  $("name-wrap").hidden = !signup;
  $("full-name").required = signup;

  $("auth-title").innerHTML = signup
    ? "Create your <em>account.</em>"
    : "Welcome <em>back.</em>";

  $("auth-sub").textContent = signup
    ? "Create an account to connect with RS Digital Marketing."
    : "Sign in to your RS Digital Marketing account.";

  $("submit-btn").textContent = signup
    ? "Create account & verify email"
    : "Sign in";

  $("password").autocomplete = signup
    ? "new-password"
    : "current-password";

  $("reset-btn").hidden = signup;
}

$("signin-tab").addEventListener("click", () => setMode("signin"));
$("signup-tab").addEventListener("click", () => setMode("signup"));

let auth = null;
let googleProvider = null;

try {
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.projectId ||
    !firebaseConfig.appId
  ) {
    throw new Error("Firebase configuration is incomplete.");
  }

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

} catch (error) {
  showMessage(error.message, true);
}

$("auth-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!auth) {
    showMessage("Firebase is not configured.", true);
    return;
  }

  clearMessage();

  const email = $("email").value.trim();
  const password = $("password").value;

  $("submit-btn").disabled = true;

  try {
    if (mode === "signup") {
      const name = $("full-name").value.trim();

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (name) {
        await updateProfile(credential.user, {
          displayName: name
        });
      }

      await sendEmailVerification(credential.user);
      await signOut(auth);

      $("auth-form").reset();

      showMessage(
        "Account created! Check your email and verify your account before signing in."
      );

    } else {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await credential.user.reload();

      if (!credential.user.emailVerified) {
        await sendEmailVerification(credential.user);
        await signOut(auth);

        showMessage(
          "Please verify your email first. A new verification link has been sent.",
          true
        );
        return;
      }

      showMessage(
        "Login successful! Welcome to RS Digital Marketing."
      );
    }

  } catch (error) {
    const errors = {
      "auth/email-already-in-use": "This email already has an account.",
      "auth/invalid-email": "Invalid email address.",
      "auth/weak-password": "Password must contain at least 6 characters.",
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/too-many-requests": "Too many attempts. Try again later.",
      "auth/unauthorized-domain": "Add your website domain to Firebase Authorized domains."
    };

    showMessage(
      errors[error.code] || error.message,
      true
    );

  } finally {
    $("submit-btn").disabled = false;
  }
});

$("google-btn").addEventListener("click", async () => {
  if (!auth) {
    showMessage("Firebase is not configured.", true);
    return;
  }

  $("google-btn").disabled = true;
  clearMessage();

  try {
    await signInWithPopup(auth, googleProvider);

    showMessage(
      "Google login successful! Welcome to RS Digital Marketing."
    );

  } catch (error) {
    showMessage(
      error.code === "auth/unauthorized-domain"
        ? "Add your GitHub domain to Firebase Authorized domains."
        : error.message,
      true
    );

  } finally {
    $("google-btn").disabled = false;
  }
});

$("reset-btn").addEventListener("click", async () => {
  if (!auth) return;

  const email = $("email").value.trim();

  if (!email) {
    showMessage("Enter your email first.", true);
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);

    showMessage(
      "Password reset link sent. Check your email."
    );

  } catch (error) {
    showMessage(error.message, true);
  }
});
```

/* ------------------------------------------------------------
   Study Smarter — authentication (front-end simulation)
   No backend is used for this project; user records are kept
   in localStorage to demonstrate the registration / login
   functional requirement end-to-end in the browser.
------------------------------------------------------------ */

function getUsers() {
  return JSON.parse(localStorage.getItem("ss_users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("ss_users", JSON.stringify(users));
}

document.addEventListener("DOMContentLoaded", () => {
  // ---- Registration form ----
  const regForm = document.getElementById("register-form");
  if (regForm) {
    const status = document.getElementById("reg-status");
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("rg-name").value.trim();
      const email = document.getElementById("rg-email").value.trim();
      const password = document.getElementById("rg-password").value;
      const confirm = document.getElementById("rg-confirm").value;

      let ok = true;
      const setErr = (id, msg) => {
        const field = document.getElementById(id).closest(".field");
        field.classList.toggle("invalid", Boolean(msg));
        field.querySelector(".error").textContent = msg || "";
        if (msg) ok = false;
      };

      setErr("rg-name", name.length < 2 ? "Enter your full name." : "");
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErr("rg-email", !emailRe.test(email) ? "Enter a valid email address." : "");
      setErr("rg-password", password.length < 6 ? "Password must be at least 6 characters." : "");
      setErr("rg-confirm", password !== confirm ? "Passwords do not match." : "");

      const users = getUsers();
      if (ok && users.some((u) => u.email === email)) {
        setErr("rg-email", "An account with this email already exists.");
        ok = false;
      }

      if (!ok) {
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status show bad";
        return;
      }

      users.push({ name, email, password });
      saveUsers(users);
      status.textContent = "Account created — you can now log in.";
      status.className = "form-status show ok";
      regForm.reset();
      setTimeout(() => (window.location.href = "login.html"), 1200);
    });
  }

  // ---- Login form ----
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    const status = document.getElementById("login-status");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("lg-email").value.trim();
      const password = document.getElementById("lg-password").value;

      // Built-in demo admin account, in addition to any registered users
      if (email === "admin@studysmarter.edu" && password === "admin123") {
        sessionStorage.setItem("ss_session", JSON.stringify({ name: "Admin", email, role: "admin" }));
        window.location.href = "admin.html";
        return;
      }

      const users = getUsers();
      const match = users.find((u) => u.email === email && u.password === password);
      if (!match) {
        status.textContent = "Incorrect email or password.";
        status.className = "form-status show bad";
        return;
      }
      sessionStorage.setItem("ss_session", JSON.stringify({ name: match.name, email, role: "user" }));
      status.textContent = `Welcome back, ${match.name}. Redirecting…`;
      status.className = "form-status show ok";
      setTimeout(() => (window.location.href = "index.html"), 1000);
    });
  }
});

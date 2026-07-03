/* ------------------------------------------------------------
   Study Smarter — contact form
   Client-side validation + simulated submission.
   Messages are persisted to localStorage so the Admin panel
   (admin.html) has real dynamic data to display.
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId).closest(".field");
    field.classList.toggle("invalid", Boolean(message));
    field.querySelector(".error").textContent = message || "";
  }

  function validate(data) {
    let valid = true;
    if (!data.name.trim() || data.name.trim().length < 2) {
      setError("cf-name", "Please enter your full name.");
      valid = false;
    } else setError("cf-name", "");

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(data.email.trim())) {
      setError("cf-email", "Please enter a valid email address.");
      valid = false;
    } else setError("cf-email", "");

    if (!data.message.trim() || data.message.trim().length < 10) {
      setError("cf-message", "Message should be at least 10 characters.");
      valid = false;
    } else setError("cf-message", "");

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("cf-name").value,
      email: document.getElementById("cf-email").value,
      subject: document.getElementById("cf-subject").value,
      message: document.getElementById("cf-message").value,
    };

    if (!validate(data)) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.className = "form-status show bad";
      return;
    }

    const messages = JSON.parse(localStorage.getItem("ss_messages") || "[]");
    messages.unshift({ ...data, date: new Date().toISOString() });
    localStorage.setItem("ss_messages", JSON.stringify(messages));

    status.textContent = "Thanks — your message has been sent. We'll reply within two working days.";
    status.className = "form-status show ok";
    form.reset();
  });
});

/* ------------------------------------------------------------
   Study Smarter — admin panel
   Guarded by sessionStorage("ss_session").role === "admin".
   Renders contact messages and registered users so the panel
   has real, inspectable data rather than static placeholders.
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("admin-root");
  if (!gate) return;

  const session = JSON.parse(sessionStorage.getItem("ss_session") || "null");
  if (!session || session.role !== "admin") {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("admin-name").textContent = session.name;

  const messages = JSON.parse(localStorage.getItem("ss_messages") || "[]");
  const users = JSON.parse(localStorage.getItem("ss_users") || "[]");

  document.getElementById("stat-messages").textContent = messages.length;
  document.getElementById("stat-users").textContent = users.length;
  document.getElementById("stat-articles").textContent = ARTICLES.length;

  const msgList = document.getElementById("message-list");
  if (messages.length === 0) {
    msgList.innerHTML = `<p class="form-note">No messages yet — submissions from the Contact page will appear here.</p>`;
  } else {
    msgList.innerHTML = messages
      .map(
        (m) => `
        <div class="msg-row">
          <div class="meta-line">
            <span>${m.name} &lt;${m.email}&gt;</span>
            <span>${new Date(m.date).toLocaleString("en-GB")}</span>
          </div>
          <strong>${m.subject || "(no subject)"}</strong>
          <p style="margin:6px 0 0;">${m.message}</p>
        </div>`
      )
      .join("");
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.removeItem("ss_session");
    window.location.href = "login.html";
  });
});

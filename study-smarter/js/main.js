/* ------------------------------------------------------------
   Study Smarter — shared behaviour (all pages)
------------------------------------------------------------ */

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Home page: render featured articles (most recent 3)
  const featuredGrid = document.getElementById("featured-grid");
  if (featuredGrid && typeof ARTICLES !== "undefined") {
    const featured = [...ARTICLES]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    featuredGrid.innerHTML = featured.map(renderCard).join("");
  }
});

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function renderCard(article) {
  return `
    <article class="card reveal">
      <div class="thumb"></div>
      <div class="meta">${article.category} · ${formatDate(article.date)}</div>
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
      <a class="read-more hl" href="article.html?id=${article.id}">Read article &rarr;</a>
    </article>
  `;
}

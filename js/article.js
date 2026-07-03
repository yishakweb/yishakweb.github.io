/* ------------------------------------------------------------
   Study Smarter — single article renderer
   Reads the numeric id from the query string (?id=3) and
   renders the matching article from ARTICLES. This is what
   makes article.html a single dynamic template instead of
   one static file per post.
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("article-root");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  const article = ARTICLES.find((a) => a.id === id) || ARTICLES[0];

  document.title = `${article.title} — Study Smarter`;

  const bodyHtml = article.body.map((para) => `<p>${para}</p>`).join("");

  container.innerHTML = `
    <div class="eyebrow">${article.category}</div>
    <div class="meta-row">
      <span>${formatDate(article.date)}</span>
      <span>·</span>
      <span>${article.readTime} min read</span>
    </div>
    <h1>${article.title}</h1>
  `;

  const bodyRoot = document.getElementById("article-body");
  bodyRoot.innerHTML = bodyHtml;

  // Related articles (same category, excluding current)
  const related = ARTICLES.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);
  const relatedRoot = document.getElementById("related-grid");
  if (relatedRoot) {
    relatedRoot.innerHTML = (related.length ? related : ARTICLES.filter((a) => a.id !== article.id).slice(0, 3))
      .map(renderCard)
      .join("");
  }
});

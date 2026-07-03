/* ------------------------------------------------------------
   Study Smarter — blog listing (search + category filter)
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("blog-grid");
  const searchInput = document.getElementById("blog-search");
  const chipRow = document.getElementById("category-chips");
  const emptyState = document.getElementById("empty-state");
  if (!grid) return;

  const categories = ["All", ...new Set(ARTICLES.map((a) => a.category))];
  let activeCategory = "All";
  let query = "";

  chipRow.innerHTML = categories
    .map(
      (c, i) =>
        `<button class="chip${i === 0 ? " active" : ""}" data-cat="${c}" type="button">${c}</button>`
    )
    .join("");

  function render() {
    const filtered = ARTICLES.filter((a) => {
      const matchesCategory = activeCategory === "All" || a.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    grid.innerHTML = filtered.map(renderCard).join("");
    emptyState.classList.toggle("show", filtered.length === 0);
  }

  chipRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    chipRow.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    render();
  });

  searchInput.addEventListener("input", (e) => {
    query = e.target.value;
    render();
  });

  render();
});

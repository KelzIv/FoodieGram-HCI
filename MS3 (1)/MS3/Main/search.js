// --- SITE-WIDE SEARCH FUNCTIONALITY ---
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar");
  const searchBtn = document.querySelector(".filter-btn");

  if (searchInput && searchBtn) {
    const redirectToHomeWithQuery = () => {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `../Main/main-page.html?search=${encodeURIComponent(query)}`;
      }
    };

    searchBtn.addEventListener("click", redirectToHomeWithQuery);

    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") redirectToHomeWithQuery();
    });
  }
});

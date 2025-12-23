document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".save-recipe-btn")
  if (!saveBtn) return // safety check

  const recipeTitle = document.querySelector(".recipe-title").textContent

  let savedRecipes = JSON.parse(localStorage.getItem("bookmarks")) || []

  // Initialize button state
  const isSaved = savedRecipes.some((r) => r.title === recipeTitle)
  if (isSaved) {
    saveBtn.textContent = "Saved ✓"
    saveBtn.classList.add("saved")
  }

  // Toggle save on click
  saveBtn.addEventListener("click", (e) => {
    e.stopPropagation() // ensure no parent intercepts the click

    savedRecipes = JSON.parse(localStorage.getItem("bookmarks")) || []
    const index = savedRecipes.findIndex((r) => r.title === recipeTitle)

    if (index === -1) {
      // Save
      savedRecipes.push({
        title: recipeTitle,
        link: window.location.pathname,
        images: [document.querySelector(".image-wrap img").src],
      })
      localStorage.setItem("bookmarks", JSON.stringify(savedRecipes))
      saveBtn.textContent = "Saved ✓"
      saveBtn.classList.add("saved")
    } else {
      // Unsave
      savedRecipes.splice(index, 1)
      localStorage.setItem("bookmarks", JSON.stringify(savedRecipes))
      saveBtn.textContent = "Save"
      saveBtn.classList.remove("saved")
    }
  })
})

// ===== LIGHT / DARK THEME =====
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark")
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  )
})

// Restore theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark")
}

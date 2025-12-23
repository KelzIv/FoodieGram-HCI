document.addEventListener("DOMContentLoaded", () => {
  const photoSection = document.querySelector(".photo-section")
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []

  // Clear any existing content
  photoSection.innerHTML = ""

  if (!bookmarks.length) {
    photoSection.innerHTML = "<p>No bookmarks yet.</p>"
    return
  }

  bookmarks.forEach((recipe) => {
    const box = document.createElement("div")
    box.classList.add("photo-box-book")

    const title = document.createElement("h3")
    title.classList.add("dish-title")
    title.textContent = recipe.title

    const link = document.createElement("a")
    link.href = recipe.link

    link.addEventListener("click", () => {
      localStorage.setItem("selectedRecipe", JSON.stringify(recipe))
    })

    const img = document.createElement("img")
    img.src = recipe.images?.[0] || "../images/default.png" // use first image
    img.alt = recipe.title
    img.onerror = () => {
      img.src = "../images/default.png" // fallback if image fails
    }

    link.appendChild(img)
    box.appendChild(title)
    box.appendChild(link)

    // Optional: "Remove" button
    const removeBtn = document.createElement("button")
    removeBtn.textContent = "Remove"
    removeBtn.classList.add("save-btn")
    removeBtn.addEventListener("click", () => {
      const updatedBookmarks = bookmarks.filter((b) => b.title !== recipe.title)
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
      box.remove()
    })
    box.appendChild(removeBtn)

    photoSection.appendChild(box)
  })
})

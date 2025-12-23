// Get the last posted recipe from localStorage
let storedRecipes = JSON.parse(localStorage.getItem("recipes")) || []

if (storedRecipes.length === 0) {
  alert("No recipe found!")
} else {
  const recipe = storedRecipes[0] // last posted recipe

  // Populate template
  document.getElementById("recipeTitle").textContent = recipe.title
  document.getElementById("recipeDescription").textContent = recipe.description
  document.getElementById("userAvatar").src = recipe.userAvatar
  document.getElementById("username").textContent = recipe.user
  document.getElementById(
    "caloriesText"
  ).textContent = `${recipe.calories} kCal`
  document.getElementById("ratingCount").textContent = `(${recipe.ratingCount})`

  // Meta info
  document.getElementById(
    "metaInfo"
  ).textContent = `${recipe.time} min • ${recipe.servings} servings • ${recipe.difficulty}`

  // Tags
  const tagsContainer = document.getElementById("tagsContainer")
  if (recipe.tags) {
    recipe.tags.forEach((tag) => {
      const div = document.createElement("div")
      div.classList.add("tag", "active")
      div.textContent = tag
      tagsContainer.appendChild(div)
    })
  }

  // Ingredients
  const ingredientsList = document.getElementById("ingredientsList")
  recipe.ingredients.forEach((ing) => {
    const li = document.createElement("li")
    li.textContent = ing
    ingredientsList.appendChild(li)
  })

  // Images (show first image)
  if (recipe.images && recipe.images.length > 0) {
    document.getElementById("recipeImage").src = recipe.images[0]
  }

  // Comments
  const commentsSection = document.getElementById("commentsSection")
  if (recipe.comments && recipe.comments.length > 0) {
    recipe.comments.forEach((comment) => {
      const div = document.createElement("div")
      div.classList.add("comment")
      div.innerHTML = `<strong>${comment.user}</strong><p>${comment.text}</p>`
      commentsSection.appendChild(div)
    })
  }
}

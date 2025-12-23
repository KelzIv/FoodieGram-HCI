/* ===========================
   SELECT ELEMENTS
=========================== */
const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")
const timeInput = document.getElementById("time")
const difficultyInput = document.getElementById("difficulty")
const servingsInput = document.getElementById("servings")
const caloriesInput = document.getElementById("calories")

const ingredientNum = document.getElementById("ingredientNum")
const ingredientUnit = document.getElementById("ingredientUnit")
const ingredientName = document.getElementById("ingredientName")
const addIngredientBtn = document.getElementById("addIngredientBtn")
const ingredientsList = document.getElementById("ingredientsList")

const imageDropbox = document.getElementById("imageDropbox")
const imageInput = document.getElementById("images")
const imageContainer = document.getElementById("imageContainer")
const displayImage = document.getElementById("displayImage")
const prevImage = document.getElementById("prevImage")
const nextImage = document.getElementById("nextImage")
const removeImageBtn = document.getElementById("removeImageBtn")
const addImageBtn = document.getElementById("addImageBtn")

const tags = document.querySelectorAll(".tags-container .tag")
const postDishBtn = document.querySelector(".post-dish-btn")

/* ===========================
   UNDER CONSTRUCTION BUTTONS
=========================== */
const underConstructionButtons = document.querySelectorAll(
  ".drafts-btn, .save-draft-btn"
)

underConstructionButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    alert("This feature is under construction!")
  })
})

/* ===========================
   INGREDIENT LIST
=========================== */
addIngredientBtn.addEventListener("click", () => {
  const num = ingredientNum.value.trim()
  const unit = ingredientUnit.value.trim()
  const name = ingredientName.value.trim()

  if (!name) return alert("Ingredient name cannot be empty.")
  if (!num || isNaN(num) || Number(num) <= 0)
    return alert("Quantity must be a positive number.")
  if (!unit) return alert("Unit cannot be empty.")

  const li = document.createElement("li")
  li.textContent = `${num} ${unit} ${name}`

  const removeBtn = document.createElement("button")
  removeBtn.textContent = "X"
  removeBtn.addEventListener("click", () => li.remove())
  li.appendChild(removeBtn)

  ingredientsList.appendChild(li)

  ingredientNum.value = ""
  ingredientUnit.value = ""
  ingredientName.value = ""
  ingredientNum.focus()
})
;[ingredientNum, ingredientUnit, ingredientName].forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addIngredientBtn.click()
    }
  })
})

/* ===========================
   IMAGE UPLOADING + SLIDESHOW
=========================== */
let images = []
let currentIndex = 0

imageDropbox.addEventListener("click", () => imageInput.click())

imageInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files)

  const validFiles = files.filter((file) => {
    if (!file.type.startsWith("image/")) {
      alert(`File "${file.name}" is not an image and will be ignored.`)
      return false
    }
    if (file.size > 5 * 1024 * 1024) {
      alert(`File "${file.name}" is too large (max 5MB).`)
      return false
    }
    return true
  })

  if (!validFiles.length) return

  images.push(...validFiles)

  if (images.length > 0) {
    currentIndex = 0
    showImage()
    imageContainer.classList.remove("hidden")
    imageDropbox.classList.add("hidden")
  }
})

function showImage() {
  if (images.length === 0) return
  const file = images[currentIndex]
  const reader = new FileReader()
  reader.onload = (e) => (displayImage.src = e.target.result)
  reader.readAsDataURL(file)
}

prevImage.addEventListener("click", () => {
  if (!images.length) return
  currentIndex = (currentIndex - 1 + images.length) % images.length
  showImage()
})

nextImage.addEventListener("click", () => {
  if (!images.length) return
  currentIndex = (currentIndex + 1) % images.length
  showImage()
})

removeImageBtn.addEventListener("click", () => {
  if (!images.length) return
  images.splice(currentIndex, 1)

  if (!images.length) {
    imageContainer.classList.add("hidden")
    imageDropbox.classList.remove("hidden")
    displayImage.src = ""
    return
  }

  currentIndex = Math.max(0, currentIndex - 1)
  showImage()
})

addImageBtn.addEventListener("click", () => imageInput.click())

/* ===========================
   TAG SELECTION
=========================== */
tags.forEach((tag) =>
  tag.addEventListener("click", () => tag.classList.toggle("active"))
)

/* ===========================
   POST DISH FUNCTIONALITY
=========================== */
postDishBtn.addEventListener("click", () => {
  const title = titleInput.value.trim()
  const description = descriptionInput.value.trim()
  const time = timeInput.value.trim()
  const difficulty = difficultyInput.value.trim()
  const servings = servingsInput.value.trim()
  const calories = caloriesInput.value.trim()

  if (!title) return alert("Title is required.")
  if (!description) return alert("Description is required.")
  if (!time || isNaN(time) || Number(time) <= 0)
    return alert("Estimated time must be a positive number.")
  if (!difficulty) return alert("Difficulty level is required.")
  if (!servings || isNaN(servings) || Number(servings) <= 0)
    return alert("Serving size must be a positive number.")
  if (calories && (isNaN(calories) || Number(calories) < 0))
    return alert("Calories must be a positive number.")

  const ingredientItems = [...ingredientsList.querySelectorAll("li")].map(
    (li) => li.firstChild.textContent
  )

  if (!ingredientItems.length) return alert("Add at least one ingredient.")
  if (!images.length) return alert("Add at least one image.")

  const activeTags = [...tags]
    .filter((t) => t.classList.contains("active"))
    .map((t) => t.textContent)

  const readers = images.map(
    (file) =>
      new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.readAsDataURL(file)
      })
  )

  Promise.all(readers).then((imageBase64Array) => {
    const newRecipe = {
      user: "You",
      userAvatar: "../images/default-icon.jpg",
      link: "../Recipes/sample-recipe.html",
      title,
      description,
      time: Number(time),
      difficulty,
      servings: Number(servings),
      calories: calories ? Number(calories) : 0,
      ingredients: ingredientItems,
      tags: activeTags,
      images: imageBase64Array,
      userRating: 0,
      ratingCount: 0,
      comments: [],
    }

    let storedRecipes = JSON.parse(localStorage.getItem("recipes")) || []
    storedRecipes.unshift(newRecipe)
    localStorage.setItem("recipes", JSON.stringify(storedRecipes))

    alert("Dish posted successfully!")
    window.location.href = "../Main/main-page.html"
  })
})

/* ===========================
   LIGHT / DARK THEME
=========================== */
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark")
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  )
})

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark")
}

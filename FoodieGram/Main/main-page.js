/* ===========================
   UNDER CONSTRUCTION BUTTONS
=========================== */
const underConstructionButtons = document.querySelectorAll(
  ".tab-btn, .tab-btn-active"
)

underConstructionButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    alert("This feature is under construction!")
  })
})

// ===== GLOBAL SELECTORS =====
const postContainer = document.querySelector(".post-container")
const TAGS = { Halal: "حلال", Spicy: "🌶", Vegan: "🌱" }

// ===== DATA =====
const sampleRecipes = [
  {
    user: "Mario",
    userAvatar: "../images/mario.jpg",
    title: "Spaghetti Bolognese",
    images: ["../images/Spaghetti.png", "../images/Spaghetti2.jpg"],
    link: "../Recipes/spagRecipe.html",
    description:
      "A classic Italian pasta dish with a rich and savory meat sauce, perfect for a cozy family dinner.",
    ingredients: [
      "200g spaghetti noodle",
      "2 tbsp olive oil",
      "3 cloves garlic, minced",
      "1 medium onion, finely chopped",
      "4 ripe tomatoes, diced",
      "2 tbsp tomato paste",
      "½ tsp red pepper flakes",
      "Salt and black pepper to taste",
      "Fresh basil leaves (for garnish)",
      "Parmesan cheese (optional)",
    ],
    calories: 350,
    userRating: 4.5,
    ratingCount: 1245,
    tags: ["Vegan", "Halal"],
    comments: [
      {
        user: "Alice",
        text: "Delicious! I added extra garlic and it was perfect.",
      },
      {
        user: "Bob",
        text: "Really loved the sauce, but I would reduce salt next time.",
      },
    ],
  },
  {
    user: "Grandma",
    userAvatar: "../images/grandma.jpg",
    title: "Grandma's Chicken Noodle Soup",
    link: "../Recipes/noodleSoupRecipe.html",
    images: ["../images/cnsoup.jpeg"],
    description:
      "Warm, comforting chicken noodle soup made from scratch, with tender chicken and fresh vegetables.",
    ingredients: [
      "150g egg noodles",
      "1 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 medium onion, diced",
      "1 medium carrot, sliced",
      "1 celery stick, chopped",
    ],
    calories: 450,
    userRating: 4.2,
    ratingCount: 5000,
    tags: ["Halal"],
    comments: [
      { user: "Charlie", text: "Super comforting, reminds me of home!" },
    ],
  },
  {
    user: "kittyLover",
    userAvatar: "../images/kittyLover.jpg",
    title: "Pancakes with Maple Syrup",
    link: "../Recipes/PancakesRecipe.html",
    images: ["../images/pancakes.webp"],
    description:
      "Fluffy pancakes served with pure maple syrup, a perfect breakfast treat.",
    ingredients: [
      "200g flour",
      "2 eggs",
      "300ml milk",
      "1 tbsp sugar",
      "1 tsp baking powder",
      "Pinch of salt",
    ],
    calories: 520,
    userRating: 4.8,
    ratingCount: 3200,
    tags: ["Halal", "Vegan"],
    comments: [
      { user: "Daisy", text: "These pancakes were so light and fluffy!" },
    ],
  },
  {
    user: "IlovePink",
    userAvatar: "../images/IlovePink.webp",
    title: "Taco",
    link: "../Recipes/TacoRecipe.html",
    images: ["../images/taco.webp"],
    description:
      "A delicious taco filled with seasoned meat, fresh vegetables, and topped with cheese and salsa.",
    ingredients: [
      "200g ground beef",
      "1 packet taco seasoning",
      "4 taco shells",
      "Lettuce, shredded",
      "Tomato, diced",
      "Cheddar cheese, shredded",
      "Sour cream",
      "Salsa",
    ],
    calories: 600,
    userRating: 4.6,
    ratingCount: 2750,
    tags: ["Halal", "Spicy"],
    comments: [
      { user: "Ethan", text: "The seasoning made all the difference!" },
    ],
  },
  {
    user: "pinkHairPerson",
    userAvatar: "../images/pink.jpg",
    title: "Turkey",
    link: "../Recipes/TurkeyRecipe.html",
    images: ["../images/turkey.webp"],
    description:
      "Juicy roasted turkey with crispy skin, perfect for holiday feasts and special occasions.",
    ingredients: [
      "1 whole turkey (about 5kg)",
      "2 tbsp olive oil",
      "Salt and pepper",
      "Fresh herbs (rosemary, thyme, sage)",
      "1 lemon, halved",
      "4 cloves garlic, smashed",
    ],
    calories: 750,
    userRating: 4.3,
    ratingCount: 1800,
    tags: ["Halal", "Spicy"],
    comments: [
      { user: "Fiona", text: "Turned out great! The skin was so crispy." },
    ],
  },
]

const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || []
const recipesToDisplay = [...storedRecipes, ...sampleRecipes]

// ===== RENDER FUNCTION =====
function renderRecipes(list) {
  postContainer.innerHTML = ""

  if (list.length === 0) {
    postContainer.innerHTML = `
      <div class="no-results">
        <p>No results found.</p>
      </div>
    `
    return
  }

  list.forEach((post) => {
    const postCard = document.createElement("div")
    postCard.classList.add("post-card")

    // Star rating
    const fullStars = Math.floor(post.userRating || 0)
    const halfStar = post.userRating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStar
    let starsHTML = ""
    for (let i = 0; i < fullStars; i++) starsHTML += `<span>★</span>`
    if (halfStar) starsHTML += `<span>☆</span>`
    for (let i = 0; i < emptyStars; i++) starsHTML += `<span>☆</span>`

    // Ensure images array exists
    const imagesArray =
      post.images && post.images.length ? post.images : ["images/default.png"]

    // ===== HTML =====
    postCard.innerHTML = `
      <div class="post-user">
        <img src="${
          post.userAvatar || "images/default-avatar.png"
        }" class="user-avatar">
        <span class="username">${post.user || "Anonymous"}</span>
      </div>

      <div class="recipe-layout">
        <div class="recipe-images">
          <img src="${imagesArray[0]}" class="post-image" />
          <div class="image-meta">
            <div class="tags-container">
              ${
                post.tags
                  ?.map(
                    (tag) =>
                      `<div class="tag ${tag.toLowerCase()} active" data-symbol="${
                        TAGS[tag] || ""
                      }">${tag}</div>`
                  )
                  .join("") || ""
              }
            </div>
            <div class="calories">${post.calories || 0} kCal</div>
          </div>
        </div>

        <div class="recipe-info">
          <div class="highlight-block">
            <h2>${post.title}</h2>
            <div class="user-rating">${starsHTML}<span class="rating-count">(${
      post.ratingCount || 0
    })</span></div>
            <p class="recipe-description">${post.description}</p>
            <h3>Ingredients</h3>
            <ul class="ingredients-list">
              ${
                post.ingredients
                  ?.slice(0, 5)
                  .map((i) => `<li>${i}</li>`)
                  .join("") || ""
              }
              ${
                post.ingredients?.length > 5
                  ? `<div class="ingredients-preview-overlay">+${
                      post.ingredients.length - 5
                    } more ingredients</div>`
                  : ""
              }
            </ul>
          </div>

          <div class="highlight-block">
            <div class="comments-section">
              ${
                post.comments?.length
                  ? `<div class="comment"><strong>${post.comments[0].user}</strong><p>${post.comments[0].text}</p></div>`
                  : `<p style="font-style: italic;">No comments yet</p>`
              }
            </div>
          </div>
        </div>
      </div>
    `

    // ===== Save Recipe Button (text-based) =====
    const saveButton = document.createElement("button")
    saveButton.classList.add("save-recipe-btn")
    saveButton.textContent = "Save"

    // Check localStorage for saved recipes
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
    if (bookmarks.some((r) => r.title === post.title)) {
      saveButton.classList.add("saved")
      saveButton.textContent = "Saved ✓"
    }

    // Click handler to toggle save state
    saveButton.onclick = () => {
      let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
      const index = bookmarks.findIndex((r) => r.title === post.title)

      if (index === -1) {
        // Save recipe
        bookmarks.push(post)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        saveButton.classList.add("saved")
        saveButton.textContent = "Saved ✓"
      } else {
        // Remove recipe
        bookmarks.splice(index, 1)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        saveButton.classList.remove("saved")
        saveButton.textContent = "Save"
      }
    }

    postCard.appendChild(saveButton)

    // ===== View Recipe Button =====
    const viewButton = document.createElement("button")
    viewButton.classList.add("view-recipe-btn")
    viewButton.textContent = "View Recipe →"
    viewButton.onclick = () => {
      localStorage.setItem("selectedRecipe", JSON.stringify(post))
      window.location.href = post.link
    }
    postCard.appendChild(viewButton)

    // ===== Image Slideshow & Overlay =====
    let index = 0
    const imgEl = postCard.querySelector(".post-image")
    showClickOverlayOnce(imgEl)

    imgEl.addEventListener("click", (e) => {
      index = (index + 1) % imagesArray.length
      e.target.src = imagesArray[index]
    })

    postContainer.appendChild(postCard)
  })
}

// ===== IMAGE CLICK OVERLAY FUNCTION =====
function showClickOverlayOnce(imgElement) {
  if (!localStorage.getItem("hasSeenImageTip")) {
    const overlay = document.createElement("div")
    overlay.classList.add("image-click-overlay")
    overlay.textContent = "Click image to see more photos →"
    imgElement.parentElement.style.position = "relative"
    imgElement.parentElement.appendChild(overlay)

    imgElement.addEventListener("click", () => {
      overlay.classList.add("hide")
      localStorage.setItem("hasSeenImageTip", "true")
      setTimeout(() => overlay.remove(), 300)
    })
  }
}

// ===== INITIAL RENDER =====
renderRecipes(recipesToDisplay)

// ===== SEARCH =====
document.getElementById("searchBtn").addEventListener("click", () => {
  const q = document.getElementById("searchInput").value.toLowerCase().trim()
  renderRecipes(
    q
      ? recipesToDisplay.filter((r) => r.title.toLowerCase().includes(q))
      : recipesToDisplay
  )
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

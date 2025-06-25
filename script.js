let inventoryData = [];

fetch("./inventory.json")
  .then(res => res.json())
  .then(data => {
    inventoryData = data;
    renderInventory("all");
    updateCartDisplay();
  });

// Renders filtered inventory
function renderInventory(category) {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = "";

  const filtered = category === "all"
    ? inventoryData
    : inventoryData.filter(item => item.category === category);

  filtered.forEach(item => {
    const product = document.createElement("div");
    product.classList.add("product");
    product.innerHTML = `
      <div class="product-inner">
        <div class="product-text">
          <h2>${item.name}</h2>
          <p>Price: $${item.price}</p>
          <p>Stock: ${item.stock}</p>
          <p>Category: ${item.category}</p>
          <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
        </div>
        <div class="product-image">
          <img src="images/${item.image}" alt="${item.name}" class="firework-img">
        </div>
      </div>
    `;
    inventoryDiv.appendChild(product);
  });
}

// Filter buttons
document.querySelectorAll("#category-filter button").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.getAttribute("data-category");
    renderInventory(cat);
  });
});

// Add to cart
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(i => i.name === item.name);

  if (existing) {
    existing.qty += 1;
  } else {
    item.qty = 1;
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Cart display update
function updateCartDisplay() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.qty;
    totalPrice += item.qty * item.price;
  });

  const cartIcon = document.getElementById("cart-icon");
  const totalPriceSpan = document.getElementById("total-price");

  if (cartIcon) cartIcon.setAttribute("data-count", totalItems);
  if (totalPriceSpan) totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;
}

// Theme toggle
const toggle = document.getElementById("toggle-theme");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") document.body.classList.add("light-mode");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const newTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
});

function setupImageClickListeners() {
  const allImages = document.querySelectorAll(".firework-img");
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  const closeModal = document.getElementById("close-modal");

  allImages.forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalImg.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modalImg.src = "";
    }
  });
  

  setupImageClickListeners();
}

// Load inventory.json and display products
fetch("./inventory.json")
  .then(response => response.json())
  .then(data => {
    const inventoryDiv = document.getElementById("inventory");
    data.forEach(item => {
      const product = document.createElement("div");
      product.className = "product";

      product.innerHTML = `
        <img src="${item.image || 'default-image.jpg'}" alt="${item.name}" class="product-img" />
        <div>
          <h2>${item.name}</h2>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Stock: ${item.stock}</p>
          <button>Add to Cart</button>
        </div>
      `;

      // Add image click event for modal
      const img = product.querySelector("img");
      img.addEventListener("click", () => {
        openModal(img.src, item.name);
      });

      // Add to cart button
      const addToCartBtn = product.querySelector("button");
      addToCartBtn.addEventListener("click", () => {
        addToCart(item);
      });

      inventoryDiv.appendChild(product);
    });
  })
  .catch(err => console.error("Failed to load inventory:", err));

// Modal open function
function openModal(src, alt) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const caption = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = src;
  caption.textContent = alt;
}

// Modal close button
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("image-modal").style.display = "none";
});

// Add to cart and update localStorage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Update cart icon count and total price
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const countSpan = document.getElementById('cart-count');
  const totalSpan = document.getElementById('cart-total-price');

  if (countSpan) countSpan.textContent = count;
  if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
}

// Initialize cart count on page load
updateCartCount();

// Theme toggle logic
const themeToggle = document.getElementById('toggle-theme');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
});

function updateCartDisplay() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.qty;
    totalPrice += item.price * item.qty;
  });

  const cartIcon = document.getElementById('cart-icon');
  const totalPriceSpan = document.getElementById('total-price');

  if (cartIcon) {
    cartIcon.setAttribute('data-count', totalItems);
  }

  if (totalPriceSpan) {
    totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

// Call it when the page loads
updateCartDisplay();

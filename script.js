// Load Inventory
fetch("./inventory.json")
  .then(response => response.json())
  .then(data => {
    const inventoryDiv = document.getElementById("inventory");

    data.forEach(item => {
      const product = document.createElement("div");
      product.className = "product";

      product.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}" class="product-img" />
        <p>Price: $${item.price}</p>
        <p>Stock: ${item.stock}</p>
        <button>Add to Cart</button>
        <hr>
      `;

      // Add click event to image:
      const img = product.querySelector("img");
      img.addEventListener("click", () => {
        openModal(img.src, item.name);
      });

      inventoryDiv.appendChild(product);
    });
  })
  .catch(err => console.error("Failed to load inventory:", err));

// Cart Logic
const cart = [];
const cartItemsDiv = document.getElementById("cart-items");
const clearCartBtn = document.getElementById("clear-cart");

document.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    const name = e.target.getAttribute('data-name');
    const price = parseFloat(e.target.getAttribute('data-price'));
    addToCart({ name, price });
  }
});

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

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const countSpan = document.getElementById('cart-count');
  const totalSpan = document.getElementById('cart-total-price');

  if (countSpan) countSpan.textContent = count;
  if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
}


updateCartCount();

function updateCartDisplay() {
  if (cart.length === 0) {
    cartItemsDiv.textContent = 'Cart is empty.';
    return;
  }

  cartItemsDiv.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    `;
    cartItemsDiv.appendChild(div);
  });
}

clearCartBtn.addEventListener('click', () => {
  cart.length = 0;
  updateCartDisplay();
});

updateCartDisplay();

// Modal Logic
function openModal(src, alt) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const caption = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = src;
  caption.textContent = alt;
}

// Close modal when clicking the X:
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("image-modal").style.display = "none";
});
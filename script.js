fetch("./inventory.json")
  .then(response => response.json())
  .then(data => {
    const inventoryDiv = document.getElementById("inventory");
    data.forEach(item => {
      const product = document.createElement("div");
      product.classList.add("product-box");

      product.innerHTML = `
        <h2>${item.name}</h2>
        <p>Price: $${item.price}</p>
        <p>Stock: ${item.stock}</p>
        <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        ${item.image ? `<img src="${item.image}" alt="${item.name}" class="product-img">` : ''}
      `;

      inventoryDiv.appendChild(product);
    });
  })
  .catch(err => console.error("Failed to load inventory:", err));

  const cart = [];

// Listen for Add to Cart clicks
document.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    const name = e.target.getAttribute('data-name');
    const price = parseFloat(e.target.getAttribute('data-price'));
    addToCart({ name, price });
  }
});

function addToCart(product) {
  // Check if product already in cart
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  alert(`Added ${product.name} to cart!`);
  console.log(cart);
}

const cartItemsDiv = document.getElementById('cart-items');
const clearCartBtn = document.getElementById('clear-cart');

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
  alert('Cart cleared!');
});

// Initial call to show empty cart on page load
updateCartDisplay();

// 🔍 Image Modal Logic
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close-btn");

document.addEventListener("click", e => {
  if (e.target.classList.contains("product-img")) {
    modal.style.display = "block";
    modalImg.src = e.target.src;
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.style.display = "none";
});
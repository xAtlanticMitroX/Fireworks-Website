// Update cart count & total in header
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const countSpan = document.getElementById('cart-count');
  const totalSpan = document.getElementById('cart-total-price');

  if (countSpan) countSpan.textContent = count;
  if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
}

// Load and show order summary
function loadOrderSummary() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const orderItemsDiv = document.getElementById('order-items');
  const orderTotalSpan = document.getElementById('order-total');

  if (cart.length === 0) {
    orderItemsDiv.textContent = 'Your cart is empty.';
    orderTotalSpan.textContent = '$0.00';
    return;
  }

  orderItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
    orderItemsDiv.appendChild(div);
    total += item.price * item.qty;
  });
  orderTotalSpan.textContent = `$${total.toFixed(2)}`;
}

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', e => {
  e.preventDefault();

  // Simple validation already handled by 'required' attributes

  // Normally, here you'd send the data to a backend or email API
  // For now, just simulate successful order

  // Clear cart
  localStorage.removeItem('cart');

  // Hide form and summary, show confirmation
  document.querySelector('.checkout-summary').style.display = 'none';
  document.querySelector('.checkout-form-section').style.display = 'none';
  document.getElementById('confirmation-message').style.display = 'block';

  updateCartCount();
});

// Back to shop button
document.getElementById('back-to-shop').addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Initialize page
updateCartCount();
loadOrderSummary();

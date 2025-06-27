document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Optional: Validate cart not empty
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Optional: Get user info
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  // Display order confirmation
  document.getElementById("checkout-form").style.display = "none";
  document.getElementById("order-confirmation").classList.remove("hidden");

  // Optional: Print to console or send via email later
  console.log("Order Placed:", {
    name,
    email,
    address,
    cart
  });

  // Clear the cart
  localStorage.removeItem("cart");
});

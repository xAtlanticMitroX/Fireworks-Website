fetch("./inventory.json")
  .then(response => response.json())
  .then(data => {
    const inventoryDiv = document.getElementById("inventory");
    data.forEach(item => {
      const product = document.createElement("div");
      product.innerHTML = `
        <h2>${item.name}</h2>
        <p>Price: $${item.price}</p>
        <p>Stock: ${item.stock}</p>
        <hr>
      `;
      inventoryDiv.appendChild(product);
    });
  })
  .catch(err => console.error("Failed to load inventory:", err));
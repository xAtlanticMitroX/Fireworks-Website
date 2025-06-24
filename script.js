fetch('inventory.json')
  .then(response => response.json())
  .then(data => {
    const inventoryDiv = document.getElementById("inventory");
    data.forEach(item => {
      const product = document.createElement("div");
      product.innerHTML = `
        <h2>${item.Name}</h2>
        <p>Price: $${item.Price}</p>
        <p>Stock: ${item.Stock}</p>
        <hr>
      `;
      inventoryDiv.appendChild(product);
    });
  })
  .catch(err => console.error("Failed to load inventory:", err));
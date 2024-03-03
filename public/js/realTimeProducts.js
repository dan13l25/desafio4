function getProducts() {
    fetch("/products")
      .then((response) => response.json())
      .then((products) => {
        // Aquí se debe actualizar la lista de productos en la vista
        const productList = document.getElementById("productList");
        productList.innerHTML = "";
  
        products.forEach((product) => {
          const productElement = document.createElement("li");
          productElement.textContent = product.name;
          productList.appendChild(productElement);
        });
      });
  }
  
  // Se realiza la primera solicitud de Long Polling
  getProducts();
  
  // Se configura un intervalo para realizar las solicitudes de Long Polling cada 5 segundos
  setInterval(getProducts, 5000);
class ProductCard extends HTMLElement {
  connectedCallback() {
    const productId = this.getAttribute("data-product-id");
    const image = this.getAttribute("image");
    const name = this.getAttribute("name");
    const price = this.getAttribute("price");
    
    // TODO: handle cart functionality
    this.innerHTML = `
        <div class="card product-card" style="cursor: pointer;">
          <img
            src="${image}"
            class="card-img-top p-2"
            alt="${name}"
          />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${price} L.E</p>
            <button class="btn btn-primary")">Add to cart</button> 
          </div>
        </div>
    `;

    // Add click event to the entire card
    this.querySelector(".product-card").addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        navigateToProduct(productId);
      }
    });
  }
}

// Global function for navigation
function navigateToProduct(productId) {
  window.location.href = `/product.html?id=${productId}`;
}

customElements.define("product-card", ProductCard);
class ProductCard extends HTMLElement {
  connectedCallback() {
    const productId = this.getAttribute("data-product-id");
    const image = this.getAttribute("image");
    const name = this.getAttribute("name");
    const price = this.getAttribute("price");
    const basePrice = this.getAttribute("base-price") || price;
    
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
            <button class="btn btn-primary add-to-cart-btn">Add to cart</button> 
          </div>
        </div>
    `;

    this.querySelector(".product-card").addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        navigateToProduct(productId);
      }
    });

    this.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      this.addToCart(productId, name, basePrice, image);
    });
  }

  addToCart(productId, name, basePrice, image) {
    if (!window.cartManager || !window.cartManager.isLoggedIn()) {
      alert('Please sign in to add items to cart');
      window.location.href = 'login.html';
      return;
    }

    const product = {
      id: productId,
      name: name,
      basePrice: parseFloat(basePrice),
      image: image
    };

    const success = window.cartManager.addToCart(product);
    if (success) {
      const button = this.querySelector('.add-to-cart-btn');
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.classList.remove('btn-primary');
      button.classList.add('btn-success');
      
      this.updateNavbarCartCount();
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('btn-success');
        button.classList.add('btn-primary');
      }, 1500);
    }
  }

  updateNavbarCartCount() {
    const navbar = document.querySelector('nav-bar');
    if (navbar && navbar.updateCartCount) {
        navbar.updateCartCount();
    }
  }
  }

function navigateToProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}

customElements.define("product-card", ProductCard);
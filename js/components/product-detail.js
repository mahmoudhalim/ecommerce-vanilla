// Product Image Component
class ProductImage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="product-image-container">
        <img id="detail-image" src="" alt="" class="img-fluid rounded">
      </div>
    `;
  }
}

// Product Info Component
class ProductInfo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="product-info-container">
        <h1 id="detail-name" class="product-title mb-3"></h1>
        <p id="detail-description" class="product-description text-muted mb-4"></p>
        <div class="product-price mb-4">
          <h3 id="detail-price" class="text-primary"></h3>
        </div>
        
        <div class="product-options mb-4">
          <div class="option-group mb-3">
            <label class="form-label">Size:</label>
            <select id="size-option" class="form-select">
              <option value="Small">Small</option>
              <option value="Medium" selected>Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          
          <div class="option-group mb-3" id="milk-option-group">
            <label class="form-label">Milk:</label>
            <select id="milk-option" class="form-select">
              <option value="Regular">Regular</option>
              <option value="Oat">Oat</option>
            </select>
          </div>
          
          <div class="option-group mb-3" id="temperature-option-group">
            <label class="form-label">Temperature:</label>
            <select id="temperature-option" class="form-select">
              <option value="Hot">Hot</option>
              <option value="Iced">Iced</option>
            </select>
          </div>
        </div>
        
        <div class="product-actions">
          <button class="btn btn-primary btn-lg me-3" onclick="addToCart()">
            <i class="bi bi-cart-plus"></i> Add to Cart
          </button>
          <button class="btn btn-outline-secondary" onclick="goBack()">
            <i class="bi bi-arrow-left"></i> Back to Products
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("product-image", ProductImage);
customElements.define("product-info", ProductInfo);

// Product Detail Controller
class ProductDetailController {
  constructor() {
    this.product = null;
    this.init();
  }

  async init() {
    try {
      // Get product ID from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      
      if (!productId) {
        this.showError('Product not found');
        return;
      }

      // Load products from JSON
      const response = await fetch('/assets/products.json');
      const products = await response.json();
      
      // Find the specific product
      this.product = products.find(p => p.id == productId);
      
      if (!this.product) {
        this.showError('Product not found');
        return;
      }

      this.renderProduct();
    } catch (error) {
      console.error('Error loading product:', error);
      this.showError('Error loading product');
    }
  }

  renderProduct() {
    // Update image
    const imageElement = document.getElementById('detail-image');
    imageElement.src = this.product.image;
    imageElement.alt = this.product.name;

    // Update info
    document.getElementById('detail-name').textContent = this.product.name;
    document.getElementById('detail-description').textContent = this.product.description;
    document.getElementById('detail-price').textContent = `${this.product.basePrice} L.E`;

    // Handle options visibility based on category
    this.handleOptions();
  }

  handleOptions() {
    const milkOptionGroup = document.getElementById('milk-option-group');
    const temperatureOptionGroup = document.getElementById('temperature-option-group');
    
    // Hide milk and temperature options for food items
    if (this.product.category === 'food') {
      milkOptionGroup.style.display = 'none';
      temperatureOptionGroup.style.display = 'none';
    }
  }

  showError(message) {
    const container = document.querySelector('.product-detail');
    container.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${message}
      </div>
    `;
  }
}

// Global functions for button actions
function addToCart() {
  const size = document.getElementById('size-option').value;
  const milk = document.getElementById('milk-option')?.value || 'N/A';
  const temperature = document.getElementById('temperature-option')?.value || 'N/A';
  
  console.log('Added to cart:', {
    product: window.productController.product.name,
    size,
    milk,
    temperature
  });
  
  // Show success message
  alert('Product added to cart!');
}

function goBack() {
  window.location.href = '/index.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.productController = new ProductDetailController();
});
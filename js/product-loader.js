class ProductLoader {
  constructor() {
    this.products = [];
    this.init();
  }

  async init() {
    try {
      const response = await fetch('/assets/products.json');
      this.products = await response.json();
      this.renderProducts();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  renderProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';

    const productsToShow = this.products.slice(0, 4);
    
    productsToShow.forEach(product => {
      const productCard = document.createElement('product-card');
      productCard.className = 'col-12 col-md-6 col-lg-3';
      productCard.setAttribute('data-product-id', product.id);
      productCard.setAttribute('image', product.image);
      productCard.setAttribute('name', product.name);
      productCard.setAttribute('price', product.basePrice);
      productsContainer.appendChild(productCard);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProductLoader();
});
class ProductLoader {
  constructor() {
    this.products = [];
    this.currentIndex = 0;
    this.productsPerSlide = 4;
    this.autoSlideInterval = null;
    this.init();
  }

  async init() {
    try {
      const response = await fetch('assets/products.json');
      this.products = await response.json();
      this.renderProducts();
      this.setupCarouselControls();
      this.startAutoSlide();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  renderProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';

    const productsToShow = this.getProductsForCurrentSlide();
    
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

  getProductsForCurrentSlide() {
    const startIndex = this.currentIndex * this.productsPerSlide;
    const endIndex = startIndex + this.productsPerSlide;
    return this.products.slice(startIndex, endIndex);
  }

  setupCarouselControls() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevSlide());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.product-carousel');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
      carouselContainer.addEventListener('mouseleave', () => this.startAutoSlide());
    }
  }

  nextSlide() {
    const maxIndex = Math.ceil(this.products.length / this.productsPerSlide) - 1;
    this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
    this.renderProducts();
  }

  prevSlide() {
    const maxIndex = Math.ceil(this.products.length / this.productsPerSlide) - 1;
    this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
    this.renderProducts();
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 2000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProductLoader();
});
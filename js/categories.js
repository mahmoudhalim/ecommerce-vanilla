class CategoriesPage {
  constructor() {
    this.filteredProducts = [];
    this.allProducts = [];
    this.currentSort = 'default';
    this.currentSearchQuery = '';
    this.currentFilters = {
      categories: [],
      minPrice: null,
      maxPrice: null
    };
    
    this.init();
  }

  async init() {
    try {
      await this.loadProducts();
      this.setupEventListeners();
      this.renderProducts();
    } catch (error) {
      console.error('Error initializing categories page:', error);
    }
  }

  async loadProducts() {
    try {
      const response = await fetch('/assets/products.json');
      this.allProducts = await response.json();
      this.filteredProducts = [...this.allProducts];
    } catch (error) {
      console.error('Error loading products:', error);
      throw error;
    }
  }

  setupEventListeners() {
    // Filter changes
    document.addEventListener('filtersChanged', (e) => {
      this.currentFilters = e.detail;
      this.applyFilters();
    });

    // Search
    document.addEventListener('searchPerformed', (e) => {
      this.currentSearchQuery = e.detail;
      this.applyFilters();
    });

    // Sort changes
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.applySort();
        this.renderProducts();
      });
    }


  }

  applyFilters() {
    this.filteredProducts = this.allProducts.filter(product => {
      // Apply search filter 
      if (this.currentSearchQuery.trim()) {
        const searchTerm = this.currentSearchQuery.toLowerCase();
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                              product.description.toLowerCase().includes(searchTerm) ||
                              product.category.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Apply category filter
      if (this.currentFilters.categories.length > 0 && !this.currentFilters.categories.includes(product.category)) {
        return false;
      }

      // Apply price range filter
      if (this.currentFilters.minPrice !== null && product.basePrice < this.currentFilters.minPrice) {
        return false;
      }

      if (this.currentFilters.maxPrice !== null && product.basePrice > this.currentFilters.maxPrice) {
        return false;
      }

      return true;
    });

    this.applySort();
    this.renderProducts();
  }

  applySort() {
    switch (this.currentSort) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Reset to original order
        this.filteredProducts.sort((a, b) => a.id - b.id);
    }
  }

  renderProducts() {
    const container = document.getElementById('products-container');
    const noResults = document.getElementById('no-results');
    const productCount = document.getElementById('product-count');

    if (!container) return;

    // Show all products
    const productsToShow = this.filteredProducts;

    // Update product count
    if (productCount) {
      const total = this.filteredProducts.length;
      productCount.textContent = `${total} products`;
    }

    // Show/hide no results message
    if (productsToShow.length === 0) {
      container.innerHTML = '';
      noResults.style.display = 'block';
      return;
    } else {
      noResults.style.display = 'none';
    }

    // Clear container
    container.innerHTML = '';

    // Always use grid view
    container.className = 'row g-3';

    // Render products
    productsToShow.forEach(product => {
      this.renderGridProduct(container, product);
    });
  }

  renderGridProduct(container, product) {
    const productCard = document.createElement('product-card');
    productCard.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';
    productCard.setAttribute('data-product-id', product.id);
    productCard.setAttribute('image', product.image);
    productCard.setAttribute('name', product.name);
    productCard.setAttribute('price', product.basePrice);
    container.appendChild(productCard);
  }


}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CategoriesPage();
});
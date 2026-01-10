class FilterSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="filter-sidebar bg-white p-3 rounded shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Filters</h5>
          <button class="btn btn-sm btn-outline-secondary" id="clear-filters">Clear all</button>
        </div>

        <!-- Categories Filter -->
        <div class="filter-section mb-4">
          <h6 class="filter-title">Categories</h6>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="cat-coffee" value="coffee">
            <label class="form-check-label" for="cat-coffee">Coffee</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="cat-pastry" value="food">
            <label class="form-check-label" for="cat-pastry">Pastries</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="cat-tea" value="tea">
            <label class="form-check-label" for="cat-tea">Tea</label>
          </div>
        </div>

        <!-- Price Range Filter -->
        <div class="filter-section mb-4">
          <h6 class="filter-title">Price Range</h6>
          <div class="price-range-container">
            <div class="d-flex gap-2 align-items-center mb-2">
              <input type="number" class="form-control form-control-sm" id="min-price" placeholder="Min" min="0">
              <span>-</span>
              <input type="number" class="form-control form-control-sm" id="max-price" placeholder="Max" min="0">
            </div>
            <button class="btn btn-sm btn-outline-primary w-100" id="apply-price-filter">Apply Price</button>
          </div>
        </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Clear all filters
    this.querySelector('#clear-filters').addEventListener('click', () => {
      this.clearAllFilters();
    });

    // Category checkboxes
    this.querySelectorAll('input[type="checkbox"][id^="cat-"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => this.applyFilters());
    });

    // Price range
    this.querySelector('#apply-price-filter').addEventListener('click', () => {
      this.applyFilters();
    });

    // Enter key on price inputs
    this.querySelectorAll('#min-price, #max-price').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.applyFilters();
        }
      });
    });
  }

  getFilters() {
    const filters = {
      categories: [],
      minPrice: null,
      maxPrice: null
    };

    // Get selected categories
    this.querySelectorAll('input[type="checkbox"][id^="cat-"]:checked').forEach(checkbox => {
      filters.categories.push(checkbox.value);
    });
    // Get price range
    const minPrice = this.querySelector('#min-price').value;
    const maxPrice = this.querySelector('#max-price').value;
    
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);

    return filters;
  }

  applyFilters() {
    // Dispatch custom event with filter data
    const event = new CustomEvent('filtersChanged', {
      detail: this.getFilters()
    });
    document.dispatchEvent(event);
  }

  clearAllFilters() {
    // Clear all checkboxes
    this.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });

    // Clear price inputs
    this.querySelector('#min-price').value = '';
    this.querySelector('#max-price').value = '';

    this.applyFilters();
  }
}

customElements.define('filter-sidebar', FilterSidebar);
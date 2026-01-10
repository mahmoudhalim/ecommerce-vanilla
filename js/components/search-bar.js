class SearchBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="search-bar">
        <div class="row g-3 align-items-center">
          <div class="col-md-8">
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                class="form-control border-start-0 ps-0" 
                id="search-input"
                placeholder="Search for products..."
              >
            </div>
          </div>
          <div class="col-md-4">
          </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const searchInput = this.querySelector("#search-input");

    // Search input event
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch(e.target.value);
      }
    });
  }

  performSearch(query) {
    const event = new CustomEvent("searchPerformed", {
      detail: query.trim(),
    });
    document.dispatchEvent(event);
  }
}

customElements.define("search-bar", SearchBar);

class Navbar extends HTMLElement {
  connectedCallback() {
    const user = JSON.parse(localStorage.getItem("user"));
    const itemCount = this.getCartItemCount();
    
    this.innerHTML = `<nav class="navbar navbar-expand-lg">
      <div class="container">
        <a href="/" class="navbar-brand">
          <img src="assets/images/logo.png" width="100" />
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav">
            <li class="nav-item"><a href="categories.html" class="nav-link">Categories</a></li>
            <li class="nav-item"><a class="nav-link">About</a></li>
          </ul>

          <div class="ms-auto d-flex gap-2 align-items-center">
            ${
              user
                ? `
                <a href="cart.html" class="btn btn-outline-secondary position-relative">
                  <i class="bi bi-cart3"></i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-badge">
                    ${itemCount}
                  </span>
                </a>
                <div class="d-flex align-items-center">
                  <span class="navbar-text me-3">Welcome, ${user.name}</span>
                  <button id="logout-btn" class="btn btn-outline-primary">Logout</button>
                </div>
              `
                : `
                <a href="login.html" class="btn btn-outline-primary">Sign in</a>
                <a href="register.html" class="btn btn-primary">Join now</a>
              `
            }
          </div>
        </div>
      </div>
    </nav>
    `;
    if (user) {
      this.querySelector("#logout-btn").addEventListener("click", this.logout);
      this.setupCartListener();
    }
  }

  getCartItemCount() {
    if (!window.cartManager || !window.cartManager.isLoggedIn()) return 0;
    return window.cartManager.getItemCount();
  }

  setupCartListener() {
    // Update cart count on page load
    this.updateCartCount();
  }

  updateCartCount() {
    const badge = this.querySelector('#cart-badge');
    if (badge) {
      const itemCount = this.getCartItemCount();
      badge.textContent = itemCount;
    }
  }
  logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  }
}
customElements.define("nav-bar", Navbar);

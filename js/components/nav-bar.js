class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <a href="#" class="navbar-brand">
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
            <li class="nav-item"><a class="nav-link">Categories</a></li>
            <li class="nav-item"><a class="nav-link">About</a></li>
          </ul>

          <div class="ms-auto d-flex gap-2">
            <a class="btn btn-outline-primary">Sign in</a>
            <a href="register.html" class="btn btn-primary">Join now</a>
          </div>
        </div>
      </div>
    </nav>
    `;
  }
}
customElements.define("nav-bar", Navbar);

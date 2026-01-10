class Navbar extends HTMLElement {
  connectedCallback() {
    const user = JSON.parse(localStorage.getItem("user"));
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

          <div class="ms-auto d-flex gap-2">
            ${
              user
                ? `
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
    }
  }
  logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  }
}
customElements.define("nav-bar", Navbar);

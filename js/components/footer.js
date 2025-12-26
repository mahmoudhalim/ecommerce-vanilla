class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="custom-footer">
      <div class="container">
        <div class="row align-items-center mb-5">
          <div class="col-lg-7">
            <h2 class="footer-title">
              Join Coffee House now and <br />
              Get 10% Off Your First Order!
            </h2>
          </div>
          <div class="col-lg-5">
            <div class="subscribe-box">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button class="btn btn-updates">Get Updates.</button>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-md-3">
            <h4 class="footer-heading">Company</h4>
            <ul class="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Menu</a></li>
              <li><a href="#">About us</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h4 class="footer-heading">Recourse</h4>
            <ul class="footer-links">
              <li><a href="#">Contact</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Listings</a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h4 class="footer-heading">General information</h4>
            <ul class="footer-links">
              <li>Head office number : 01110493093</li>
              <li>Help centre : 01225912153</li>
              <li>Hot number : 19019</li>
            </ul>
          </div>
          <div class="col-md-3">
            <h4 class="footer-heading">Follow us</h4>
            <a href="#" class="social-link"
              ><i class="fab fa-instagram text-danger"></i> Coffee house</a
            >
            <a href="#" class="social-link"
              ><i class="fab fa-facebook text-primary"></i> Coffee house</a
            >
            <a href="#" class="social-link"
              ><i class="fab fa-youtube text-danger"></i> Coffee house</a
            >
          </div>
        </div>
        <hr />
        <div class="copyright">@2025 Coffee house all right reserve</div>
      </div>
    </footer>`;
  }
}
customElements.define("custom-footer", Footer);

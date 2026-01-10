class ProductCard extends HTMLElement {
  connectedCallback() { 
    this.innerHTML = `
        <div class="card">
          <img
            src="${this.getAttribute("image")}"
            class="card-img-top p-2"
            alt="${this.getAttribute("name")}"
          />
          <div class="card-body">
            <h5 class="card-title">${this.getAttribute("name")}</h5>
            <p class="card-text">${this.getAttribute("price")} L.E</p>
            <button class="btn btn-primary">Order Now</button>
          </div>
        </div>
    `;
  }
}

customElements.define("product-card", ProductCard);
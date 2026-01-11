class CartPage {
  constructor() {
    this.cart = null;
    this.init();
  }

  init() {
    this.loadCart();
    updateNavbarCartCount();
  }

  loadCart() {
    this.cart = window.cartManager.getCart();
    this.renderCart();
  }

  renderCart() {
    const cartContent = document.getElementById("cart-content");
    const emptyCart = document.getElementById("empty-cart");
    const orderSummary = document.getElementById("order-summary");
    const cartActions = document.getElementById("cart-actions");

    if (!this.cart || this.cart.items.length === 0) {
      cartContent.innerHTML = "";
      emptyCart.style.display = "block";
      orderSummary.style.display = "none";
      cartActions.style.display = "none";
      return;
    }

    emptyCart.style.display = "none";
    orderSummary.style.display = "block";
    cartActions.style.display = "flex";

    cartContent.innerHTML = this.renderCartItems();
    this.updateSummary();
  }

  renderCartItems() {
    const productGroups = {};
    this.cart.items.forEach((item) => {
      if (!productGroups[item.name]) {
        productGroups[item.name] = [];
      }
      productGroups[item.name].push(item);
    });

    return this.cart.items
      .map((item, index) => {
        const productCount = productGroups[item.name].reduce(
          (sum, p) => sum + p.quantity,
          0
        );

        return `
                <div class="cart-item" data-index="${index}">
                    <div class="row align-items-center">
                        <div class="col-md-2 col-3">
                            <img src="${item.image}" alt="${
          item.name
        }" style="width: 100%; height: 80px; object-fit: cover;">
                        </div>
                        <div class="col-md-6 col-6">
                            <div class="item-name">${
                              item.name
                            } <span class="product-count-badge">x${productCount}</span></div>
                            <div class="item-options">
                                ${this.formatOptions(item.options)}
                            </div>
                        </div>
                        <div class="col-md-4 col-12">
                            <div class="row align-items-center mt-2 mt-md-0">
                                <div class="col-6">
                                    <div class="quantity-controls">
                                        <div class="input-group">
                                            <button class="btn btn-sm" onclick="updateQuantity(${index}, ${
          item.quantity - 1
        })">
                                                <i class="bi bi-dash"></i>
                                            </button>
                                            <button class="btn btn-sm" onclick="updateQuantity(${index}, ${
          item.quantity + 1
        })">
                                                <i class="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 text-center">
                                    <div class="item-price">${(
                                      item.price * item.quantity
                                    ).toFixed(2)} L.E</div>
                                </div>
                                <div class="col-2 text-center">
                                    <button class="btn btn-remove btn-sm" onclick="removeFromCart(${index})">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  formatOptions(options) {
    if (!options || Object.keys(options).length === 0) return "";

    const optionBadges = [];
    if (options.size)
      optionBadges.push(
        `<span class="option-badge">Size: ${
          options.size.charAt(0).toUpperCase() + options.size.slice(1)
        }</span>`
      );
    if (options.milk)
      optionBadges.push(
        `<span class="option-badge">Milk: ${
          options.milk.charAt(0).toUpperCase() + options.milk.slice(1)
        }</span>`
      );
    if (options.temperature)
      optionBadges.push(
        `<span class="option-badge">Temp: ${
          options.temperature.charAt(0).toUpperCase() +
          options.temperature.slice(1)
        }</span>`
      );

    return optionBadges.join("");
  }

  updateSummary() {
    const subtotal = this.cart.total;
    const tax = subtotal * 0.14; // 14% tax
    const total = subtotal + tax;

    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");

    if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} L.E`;
    if (taxEl) taxEl.textContent = `${tax.toFixed(2)} L.E`;
    if (totalEl) totalEl.textContent = `${total.toFixed(2)} L.E`;
  }
}

function updateQuantity(index, quantity) {
  quantity = parseInt(quantity);
  if (isNaN(quantity) || quantity < 1) return;

  if (!window.cartPage.cart || !window.cartPage.cart.items[index]) return;

  const item = window.cartPage.cart.items[index];
  const success = window.cartManager.updateQuantity(
    item.id,
    quantity,
    item.options
  );

  if (success) {
    window.cartPage.loadCart();
    this.updateNavbarCartCount();
  }
}

function updateNavbarCartCount() {
  const navbar = document.querySelector("nav-bar");
  if (navbar && navbar.updateCartCount) {
    navbar.updateCartCount();
  }
}

function removeFromCart(index) {
  if (!window.cartPage.cart || !window.cartPage.cart.items[index]) return;

  const item = window.cartPage.cart.items[index];
  const success = window.cartManager.removeFromCart(item.id, item.options);

  if (success) {
    window.cartPage.loadCart();
    // Update navbar cart count
    updateNavbarCartCount();
  }
}

function clearCart() {
  const success = window.cartManager.clearCart();
  if (success) {
    window.cartPage.loadCart();
    // Update navbar cart count
    updateNavbarCartCount();
  }
}

function checkout() {
  alert("Checkout functionality is not implemented yet.");
}

document.addEventListener("DOMContentLoaded", () => {
  window.cartPage = new CartPage();
});

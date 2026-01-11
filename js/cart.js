class CartManager {
    constructor() {
        this.cart = null;
    }

    // Get user's cart key
    getCartKey() {
        const user = localStorage.getItem('user');
        if (!user) return null;
        const userData = JSON.parse(user);
        return `cart_${userData.email}`;
    }

    // Load cart from localStorage
    loadCart() {
        const cartKey = this.getCartKey();
        if (!cartKey) return null;
        
        const cartData = localStorage.getItem(cartKey);
        this.cart = cartData ? JSON.parse(cartData) : { items: [], total: 0 };
        return this.cart;
    }

    // Save cart to localStorage
    saveCart() {
        const cartKey = this.getCartKey();
        if (!cartKey || !this.cart) return false;
        
        localStorage.setItem(cartKey, JSON.stringify(this.cart));
        return true;
    }

    // Get current cart
    getCart() {
        if (!this.cart) {
            this.loadCart();
        }
        return this.cart;
    }

    // Add item to cart
    addToCart(product, options = {}) {
        if (!this.isLoggedIn()) return false;
        
        this.loadCart();
        
        const cartItem = {
            id: product.id,
            name: product.name,
            price: this.calculatePrice(product, options),
            image: product.image,
            quantity: 1,
            options: options
        };

        // Check if item already exists
        const existingItem = this.cart.items.find(item => 
            item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.items.push(cartItem);
        }

        this.cart.total = this.calculateTotal();
        this.saveCart();
        return true;
    }

    // Remove item from cart
    removeFromCart(productId, options = {}) {
        this.loadCart();
        
        this.cart.items = this.cart.items.filter(item => 
            !(item.id === productId && JSON.stringify(item.options) === JSON.stringify(options))
        );

        this.cart.total = this.calculateTotal();
        this.saveCart();
        return true;
    }

    // Update item quantity
    updateQuantity(productId, quantity, options = {}) {
        this.loadCart();
        
        const item = this.cart.items.find(item => 
            item.id === productId && JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId, options);
            } else {
                item.quantity = quantity;
                this.cart.total = this.calculateTotal();
                this.saveCart();
            }
        }
        return true;
    }

    // Clear entire cart
    clearCart() {
        this.loadCart();
        this.cart.items = [];
        this.cart.total = 0;
        this.saveCart();
        return true;
    }

    // Calculate item price with options
    calculatePrice(product, options) {
        let price = product.basePrice;
        
        if (options.size === 'large') {
            price += 1.00;
        } else if (options.size === 'small') {
            price -= 0.50;
        }

        return price;
    }

    // Calculate cart total
    calculateTotal() {
        if (!this.cart || !this.cart.items) return 0;
        return this.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get total item count
    getItemCount() {
        if (!this.cart || !this.cart.items) return 0;
        return this.cart.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('user') !== null;
    }
}

// Create global instance
window.cartManager = new CartManager();
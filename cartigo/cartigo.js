// API Configuration
const API_BASE = 'http://localhost:3000';

// Shopping Cart
let cart = [];
let wishlist = [];
let cartCount = 0;
let currentCartId = null;
let allProducts = [];

// Initialize cart on page load
async function initializeCart() {
    const existingCartId = localStorage.getItem('cartId');
    if (existingCartId) {
        currentCartId = existingCartId;
        await loadCart();
    } else {
        await createNewCart();
    }
}

// Create new cart
async function createNewCart() {
    try {
        const response = await fetch(`${API_BASE}/api/cart/create`, { method: 'POST' });
        const result = await response.json();
        if (result.success) {
            currentCartId = result.cartId;
            localStorage.setItem('cartId', currentCartId);
        }
    } catch (error) {
        console.error('Error creating cart:', error);
    }
}

// Load cart from API
async function loadCart() {
    try {
        const response = await fetch(`${API_BASE}/api/cart/${currentCartId}`);
        const result = await response.json();
        if (result.success) {
            cart = result.data.items;
            cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            updateCartBadge();
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

// Load products from API
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/api/products`);
        const result = await response.json();
        if (result.success) {
            allProducts = result.data;
            displayProducts();
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products dynamically
function displayProducts() {
    const flashSalesGrid = document.querySelector('.flash-sales .products-grid');
    const featuredGrid = document.querySelector('.section:nth-child(4) .products-grid');
    
    if (flashSalesGrid) {
        flashSalesGrid.innerHTML = '';
        allProducts.slice(0, 4).forEach(product => {
            flashSalesGrid.innerHTML += createProductCard(product);
        });
    }

    if (featuredGrid) {
        featuredGrid.innerHTML = '';
        allProducts.forEach(product => {
            featuredGrid.innerHTML += createProductCard(product);
        });
    }
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <div class="product-image">
                ${product.image}
                <div class="product-badge">-${product.discount}%</div>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <span class="stars">${'⭐'.repeat(product.rating)}</span>
                    <span>(${product.reviews.toLocaleString()})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">₹${product.price.toLocaleString()}</span>
                    <span class="price-original">₹${product.originalPrice.toLocaleString()}</span>
                    <span class="discount">-${product.discount}%</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(event, ${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                    <button class="wishlist-btn" onclick="toggleWishlist(event)">♡</button>
                </div>
            </div>
        </div>
    `;
}

// Navigate to product detail page
function goToProduct(productId) {
    window.location.href = `/product/${productId}`;
}

// Add to cart with API
async function addToCart(event, productId, productName, price) {
    event.stopPropagation();
    
    if (!currentCartId) {
        await createNewCart();
    }

    try {
        const response = await fetch(`${API_BASE}/api/cart/${currentCartId}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        
        const result = await response.json();
        if (result.success) {
            cart = result.cart.items;
            cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            updateCartBadge();
            alert(`✅ ${productName} added to cart!`);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart');
    }
}

// Update cart badge
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cartCount;
    }
}

// Open cart
function openCart() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let cartItems = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    if (cartItems === '') {
        cartItems = 'Your cart is empty';
    }
    alert(`Your cart:\n\n${cartItems}\n\nTotal: ₹${total.toLocaleString()}`);
}

function toggleWishlist() {
    wishlist.length > 0 ? wishlist = [] : wishlist = [1];
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.textContent = wishlist.length > 0 ? '❤️' : '♡';
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
};

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

function updateCountdown() {
    let hours = Math.floor(Math.random() * 24);
    let minutes = Math.floor(Math.random() * 60);
    let seconds = Math.floor(Math.random() * 60);

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    setTimeout(updateCountdown, 60000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart and load products
    initializeCart();
    loadProducts();

    // Search functionality
    document.querySelector('.search-btn').addEventListener('click', function() {
        const query = document.querySelector('.search-input').value;
        if (query) {
            alert(`🔍 Searching for: "${query}"\n\nShowing results...`);
        }
    });

    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function() {
            alert(`📁 Viewing category: ${this.querySelector('span').textContent}`);
        });
    });

    document.querySelector('.search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.querySelector('.search-btn').click();
        }
    });

    updateCountdown();
});

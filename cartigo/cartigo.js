// Shopping Cart
let cart = [];
let wishlist = [];
let cartCount = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    cartCount++;
    document.getElementById('cartBadge').textContent = cartCount;
    alert(`✅ ${productName} added to cart!`);
}

function openCart() {
    alert(`Your cart has ${cartCount} items\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price, 0)}`);
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

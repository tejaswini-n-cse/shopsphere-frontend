// Mock Product Data
const products = [
    {
        id: 1,
        title: "Wireless Noise-Canceling Headphones",
        category: "Electronics",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        description: "High-quality wireless audio with active noise cancellation and up to 30 hours of battery life."
    },
    {
        id: 2,
        title: "Smartwatch Series 7",
        category: "Electronics",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        description: "Stay connected with health tracking, GPS, and seamless smartphone notifications."
    },
    {
        id: 3,
        title: "Classic Leather Backpack",
        category: "Fashion",
        price: 89.50,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
        description: "Durable genuine leather backpack with dedicated laptop sleeve and spacious compartments."
    },
    {
        id: 4,
        title: "Minimalist Analog Watch",
        category: "Accessories",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
        description: "Sleek stainless steel wristwatch designed for everyday elegance."
    },
    {
        id: 5,
        title: "Ergonomic Mechanical Keyboard",
        category: "Electronics",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
        description: "RGB customizable mechanical keyboard featuring tactile tactile switches."
    },
    {
        id: 6,
        title: "Designer Sunglasses",
        category: "Accessories",
        price: 65.00,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
        description: "UV400 protection polarized sunglasses with a stylish modern frame."
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const categoryFilters = document.getElementById('category-filters');
const sortSelect = document.getElementById('sort-select');

// Render Products
function renderProducts(items) {
    productGrid.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h4 class="product-title">${product.title}</h4>
                <div class="product-bottom">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

// Update Cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <button class="icon-btn" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash" style="font-size:0.9rem; color:#ef4444;"></i>
            </button>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Open/Close Cart Drawer
function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
}

// Event Listeners
cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    renderProducts(filtered);
});

// Category Filter
categoryFilters.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-btn')) {
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.dataset.category;
        if (category === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    }
});

// Sorting
sortSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    let sorted = [...products];

    if (value === 'low-high') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (value === 'high-low') {
        sorted.sort((a, b) => b.price - a.price);
    }

    renderProducts(sorted);
});

// Initial Render
renderProducts(products);

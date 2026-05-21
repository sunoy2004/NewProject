// Sample products data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviews: 128,
        description: "Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.",
        discount: "-38%",
        icon: "🎧"
    },
    {
        id: 2,
        title: "Smart Watch",
        category: "electronics",
        price: 199.99,
        originalPrice: 299.99,
        rating: 4.7,
        reviews: 256,
        description: "Advanced fitness tracking smartwatch with heart rate monitor and multiple sports modes.",
        discount: "-33%",
        icon: "⌚"
    },
    {
        id: 3,
        title: "Casual T-Shirt",
        category: "fashion",
        price: 24.99,
        originalPrice: 39.99,
        rating: 4.3,
        reviews: 82,
        description: "Comfortable and stylish casual t-shirt made from premium cotton blend.",
        discount: "-37%",
        icon: "👕"
    },
    {
        id: 4,
        title: "Denim Jacket",
        category: "fashion",
        price: 59.99,
        originalPrice: 99.99,
        rating: 4.6,
        reviews: 145,
        description: "Classic denim jacket with modern styling, perfect for any casual outfit.",
        discount: "-40%",
        icon: "🧥"
    },
    {
        id: 5,
        title: "Coffee Maker",
        category: "home",
        price: 89.99,
        originalPrice: 139.99,
        rating: 4.4,
        reviews: 95,
        description: "Programmable coffee maker with thermal carafe and keep-warm function.",
        discount: "-36%",
        icon: "☕"
    },
    {
        id: 6,
        title: "LED Desk Lamp",
        category: "home",
        price: 34.99,
        originalPrice: 59.99,
        rating: 4.8,
        reviews: 178,
        description: "Energy-efficient LED desk lamp with adjustable brightness and color temperature.",
        discount: "-42%",
        icon: "💡"
    },
    {
        id: 7,
        title: "Yoga Mat",
        category: "sports",
        price: 29.99,
        originalPrice: 49.99,
        rating: 4.5,
        reviews: 112,
        description: "Non-slip premium yoga mat with carrying strap, perfect for all yoga styles.",
        discount: "-40%",
        icon: "🧘"
    },
    {
        id: 8,
        title: "Running Shoes",
        category: "sports",
        price: 89.99,
        originalPrice: 149.99,
        rating: 4.6,
        reviews: 201,
        description: "Professional running shoes with advanced cushioning and arch support.",
        discount: "-40%",
        icon: "👟"
    },
    {
        id: 9,
        title: "Wireless Speaker",
        category: "electronics",
        price: 69.99,
        originalPrice: 119.99,
        rating: 4.4,
        reviews: 167,
        description: "Portable Bluetooth speaker with 360-degree sound and 12-hour battery life.",
        discount: "-42%",
        icon: "🔊"
    },
    {
        id: 10,
        title: "Winter Sweater",
        category: "fashion",
        price: 44.99,
        originalPrice: 79.99,
        rating: 4.7,
        reviews: 134,
        description: "Cozy wool blend sweater perfect for cold weather, available in multiple colors.",
        discount: "-44%",
        icon: "🧶"
    },
    {
        id: 11,
        title: "Bed Pillow",
        category: "home",
        price: 39.99,
        originalPrice: 69.99,
        rating: 4.5,
        reviews: 89,
        description: "Ergonomic memory foam pillow for optimal neck support and comfort.",
        discount: "-43%",
        icon: "🛏️"
    },
    {
        id: 12,
        title: "Dumbbells Set",
        category: "sports",
        price: 59.99,
        originalPrice: 99.99,
        rating: 4.6,
        reviews: 156,
        description: "Adjustable dumbbells set with easy-to-use weight selection mechanism.",
        discount: "-40%",
        icon: "💪"
    }
];

let cart = [];
let filteredProducts = products;
let selectedProductId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
    loadCartFromStorage();
});

// Setup all event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            if (filterBtn) filterBtn.click();
        });
    });

    // Search
    const searchBtn = document.getElementById('searchBtn');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchInput.focus();
    });

    searchCloseBtn.addEventListener('click', () => {
        searchBar.classList.remove('active');
    });

    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') searchBar.classList.remove('active');
    });

    // Cart
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        updateCartDisplay();
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    checkoutBtn.addEventListener('click', handleCheckout);

    // Product modal
    const productModal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    closeModalBtn.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });

    // Quantity selector
    const decreaseQtyBtn = document.getElementById('decreaseQty');
    const increaseQtyBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantityInput');

    decreaseQtyBtn.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value--;
        }
    });

    increaseQtyBtn.addEventListener('click', () => {
        quantityInput.value++;
    });

    // Add to cart from modal
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
        const product = products.find(p => p.id === selectedProductId);
        const quantity = parseInt(document.getElementById('quantityInput').value);
        addToCart(product, quantity);
        productModal.classList.remove('active');
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', handleNewsletter);

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Display products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;

    card.innerHTML = `
        <div class="product-image" onclick="openProductModal(${product.id})" style="cursor: pointer;">
            <span class="product-badge">${product.discount}</span>
            <span>${product.icon}</span>
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="rating">
                <span class="stars">${getStarRating(product.rating)}</span>
                <span>(${product.reviews} reviews)</span>
            </div>
            <div class="product-price">
                <span class="price">$${product.price}</span>
                <span class="original-price">$${product.originalPrice}</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-add" onclick="addToCartQuick(${product.id})">Add to Cart</button>
                <button class="btn btn-wishlist" onclick="toggleWishlist(event)">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

// Get star rating
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '★';
        } else if (i === fullStars && hasHalfStar) {
            stars += '½';
        } else {
            stars += '☆';
        }
    }
    
    return stars;
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    selectedProductId = productId;

    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalRating').textContent = getStarRating(product.rating);
    document.getElementById('modalReviews').textContent = `(${product.reviews} reviews)`;
    document.getElementById('modalPrice').textContent = `$${product.price}`;
    document.getElementById('modalOriginalPrice').textContent = `$${product.originalPrice}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalImage').innerHTML = `<span style="font-size: 5rem;">${product.icon}</span>`;
    document.getElementById('quantityInput').value = 1;

    document.getElementById('productModal').classList.add('active');
}

// Add to cart (quick)
function addToCartQuick(productId) {
    const product = products.find(p => p.id === productId);
    addToCart(product, 1);
}

// Add to cart
function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    saveCartToStorage();
    updateCartCount();
    showNotification(`${product.title} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        subtotal.textContent = '$0.00';
        tax.textContent = '$0.00';
        total.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = '';
    let subtotalAmount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotalAmount += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price} each</p>
                <p style="color: var(--primary-color); font-weight: 600;">$${itemTotal.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, -1)" type="button">-</button>
                    <span style="width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" type="button">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    const taxAmount = subtotalAmount * 0.1;
    const totalAmount = subtotalAmount + taxAmount;

    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    tax.textContent = `$${taxAmount.toFixed(2)}`;
    total.textContent = `$${totalAmount.toFixed(2)}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            updateCartDisplay();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
}

// Save cart to storage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from storage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Handle filter
function handleFilter(e) {
    const filterValue = e.target.dataset.filter;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');

    if (filterValue === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === filterValue);
        displayProducts(filtered);
    }
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === '') {
        displayProducts(products);
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-filter="all"]').classList.add('active');
        return;
    }

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );

    displayProducts(filtered);
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = document.getElementById('total').textContent;
    alert(`Thank you for your purchase!\nTotal: ${total}\n\nThis is a demo. No actual transaction occurred.`);
    
    cart = [];
    saveCartToStorage();
    updateCartCount();
    document.getElementById('cartModal').classList.remove('active');
    displayProducts(products);
}

// Handle newsletter
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification(`Thank you! We've sent a confirmation to ${email}`);
    e.target.reset();
}

// Toggle wishlist
function toggleWishlist(e) {
    e.target.closest('.btn-wishlist').classList.toggle('active');
    e.preventDefault();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
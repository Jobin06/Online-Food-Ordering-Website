// FoodHub JavaScript - Complete functionality for all pages

// Global variables and data
let cart = JSON.parse(localStorage.getItem('foodhub_cart')) || [];
let currentOrder = null;

// Sample data for restaurants
const restaurants = [
    {
        id: 'mama-mia',
        name: "Mama Mia's Italian",
        cuisine: 'italian',
        rating: 4.8,
        deliveryTime: '25-35',
        deliveryFee: 2.99,
        image: 'https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Authentic Italian cuisine with fresh pasta and wood-fired pizzas'
    },
    {
        id: 'spice-palace',
        name: 'Spice Palace',
        cuisine: 'indian',
        rating: 4.6,
        deliveryTime: '30-40',
        deliveryFee: 3.49,
        image: 'https://images.pexels.com/photos/1340924/pexels-photo-1340924.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Rich and flavorful Indian dishes with traditional spices'
    },
    {
        id: 'burger-junction',
        name: 'Burger Junction',
        cuisine: 'american',
        rating: 4.5,
        deliveryTime: '20-30',
        deliveryFee: 1.99,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Gourmet burgers and crispy fries made fresh daily'
    },
    {
        id: 'golden-dragon',
        name: 'Golden Dragon',
        cuisine: 'chinese',
        rating: 4.7,
        deliveryTime: '25-35',
        deliveryFee: 2.49,
        image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Traditional Chinese cuisine with modern presentation'
    },
    {
        id: 'taco-fiesta',
        name: 'Taco Fiesta',
        cuisine: 'mexican',
        rating: 4.4,
        deliveryTime: '20-30',
        deliveryFee: 2.99,
        image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Fresh Mexican flavors with authentic street-style tacos'
    },
    {
        id: 'sushi-zen',
        name: 'Sushi Zen',
        cuisine: 'japanese',
        rating: 4.9,
        deliveryTime: '35-45',
        deliveryFee: 3.99,
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Fresh sushi and Japanese delicacies prepared by master chefs'
    }
];

// Sample menu items
const menuItems = [
    // Mama Mia's Italian
    {
        id: 'margherita-pizza',
        restaurant: 'mama-mia',
        name: 'Margherita Pizza',
        category: 'mains',
        price: 18.99,
        description: 'Fresh mozzarella, basil, and tomato sauce on wood-fired crust',
        image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian'],
        popularity: 95
    },
    {
        id: 'chicken-parm',
        restaurant: 'mama-mia',
        name: 'Chicken Parmesan',
        category: 'mains',
        price: 24.99,
        description: 'Breaded chicken breast with marinara and melted mozzarella',
        image: 'https://images.pexels.com/photos/6107787/pexels-photo-6107787.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        popularity: 88
    },
    {
        id: 'caesar-salad',
        restaurant: 'mama-mia',
        name: 'Caesar Salad',
        category: 'appetizers',
        price: 12.99,
        description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing',
        image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian'],
        popularity: 75
    },
    {
        id: 'tiramisu',
        restaurant: 'mama-mia',
        name: 'Tiramisu',
        category: 'desserts',
        price: 8.99,
        description: 'Classic Italian dessert with coffee-soaked ladyfingers',
        image: 'https://images.pexels.com/photos/6087369/pexels-photo-6087369.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian'],
        popularity: 92
    },
    
    // Spice Palace
    {
        id: 'chicken-tikka',
        restaurant: 'spice-palace',
        name: 'Chicken Tikka Masala',
        category: 'mains',
        price: 19.99,
        description: 'Tender chicken in creamy tomato curry sauce with aromatic spices',
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        popularity: 96
    },
    {
        id: 'veggie-biryani',
        restaurant: 'spice-palace',
        name: 'Vegetable Biryani',
        category: 'mains',
        price: 16.99,
        description: 'Fragrant basmati rice with mixed vegetables and traditional spices',
        image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian', 'vegan'],
        popularity: 84
    },
    {
        id: 'samosas',
        restaurant: 'spice-palace',
        name: 'Vegetable Samosas',
        category: 'appetizers',
        price: 7.99,
        description: 'Crispy pastries filled with spiced potatoes and peas (4 pieces)',
        image: 'https://images.pexels.com/photos/4331491/pexels-photo-4331491.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian', 'vegan'],
        popularity: 78
    },
    {
        id: 'mango-lassi',
        restaurant: 'spice-palace',
        name: 'Mango Lassi',
        category: 'beverages',
        price: 4.99,
        description: 'Refreshing yogurt drink blended with sweet mango',
        image: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian'],
        popularity: 87
    },
    
    // Burger Junction
    {
        id: 'classic-burger',
        restaurant: 'burger-junction',
        name: 'Classic Cheeseburger',
        category: 'mains',
        price: 14.99,
        description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        popularity: 94
    },
    {
        id: 'veggie-burger',
        restaurant: 'burger-junction',
        name: 'Veggie Deluxe Burger',
        category: 'mains',
        price: 13.99,
        description: 'Plant-based patty with avocado, sprouts, and chipotle mayo',
        image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian', 'vegan'],
        popularity: 76
    },
    {
        id: 'loaded-fries',
        restaurant: 'burger-junction',
        name: 'Loaded Cheese Fries',
        category: 'appetizers',
        price: 9.99,
        description: 'Crispy fries topped with melted cheese, bacon, and green onions',
        image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        popularity: 91
    },
    {
        id: 'milkshake',
        restaurant: 'burger-junction',
        name: 'Chocolate Milkshake',
        category: 'beverages',
        price: 6.99,
        description: 'Rich and creamy chocolate milkshake topped with whipped cream',
        image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian'],
        popularity: 89
    },
    
    // Golden Dragon
    {
        id: 'sweet-sour-chicken',
        restaurant: 'golden-dragon',
        name: 'Sweet & Sour Chicken',
        category: 'mains',
        price: 17.99,
        description: 'Crispy chicken with pineapple, bell peppers in tangy sauce',
        image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        popularity: 85
    },
    {
        id: 'beef-broccoli',
        restaurant: 'golden-dragon',
        name: 'Beef with Broccoli',
        category: 'mains',
        price: 19.99,
        description: 'Tender beef slices with fresh broccoli in savory brown sauce',
        image: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        popularity: 82
    },
    {
        id: 'spring-rolls',
        restaurant: 'golden-dragon',
        name: 'Vegetable Spring Rolls',
        category: 'appetizers',
        price: 6.99,
        description: 'Crispy rolls filled with fresh vegetables (6 pieces)',
        image: 'https://images.pexels.com/photos/4393665/pexels-photo-4393665.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: ['vegetarian', 'vegan'],
        popularity: 73
    },
    {
        id: 'fried-rice',
        restaurant: 'golden-dragon',
        name: 'Yang Chow Fried Rice',
        category: 'mains',
        price: 12.99,
        description: 'Wok-fried rice with shrimp, char siu, and scrambled eggs',
        image: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=400',
        dietary: [],
        popularity: 88
    }
];

// Initialize the application
$(document).ready(function() {
    updateCartCount();
    
    // Initialize page-specific content
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadRestaurants();
    } else if (window.location.pathname.includes('menu.html')) {
        loadMenuItems();
        setupMenuFilters();
    } else if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
        setupDeliveryOptions();
    } else if (window.location.pathname.includes('order-tracking.html')) {
        loadRecentOrders();
        setupOrderTracking();
    }
});

// Restaurant functions
function loadRestaurants() {
    const container = $('#restaurants-container');
    if (container.length === 0) return;
    
    let html = '';
    restaurants.forEach(restaurant => {
        html += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card restaurant-card h-100" onclick="viewRestaurantMenu('${restaurant.id}')">
                    <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title fw-bold">${restaurant.name}</h5>
                            <span class="restaurant-rating">
                                <i class="fas fa-star"></i> ${restaurant.rating}
                            </span>
                        </div>
                        <p class="card-text text-muted">${restaurant.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-clock me-1"></i>${restaurant.deliveryTime} min
                            </small>
                            <small class="text-muted">
                                <i class="fas fa-truck me-1"></i>$${restaurant.deliveryFee}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    container.html(html);
}

function searchRestaurants() {
    const searchTerm = $('#search-input').val().toLowerCase();
    const cuisineFilter = $('#cuisine-filter').val();
    
    let filteredRestaurants = restaurants.filter(restaurant => {
        const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm) ||
                             restaurant.description.toLowerCase().includes(searchTerm);
        const matchesCuisine = !cuisineFilter || restaurant.cuisine === cuisineFilter;
        
        return matchesSearch && matchesCuisine;
    });
    
    displayFilteredRestaurants(filteredRestaurants);
}

function displayFilteredRestaurants(filteredRestaurants) {
    const container = $('#restaurants-container');
    if (filteredRestaurants.length === 0) {
        container.html(`
            <div class="col-12 text-center">
                <div class="py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>No restaurants found</h4>
                    <p class="text-muted">Try adjusting your search criteria</p>
                </div>
            </div>
        `);
        return;
    }
    
    let html = '';
    filteredRestaurants.forEach(restaurant => {
        html += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card restaurant-card h-100" onclick="viewRestaurantMenu('${restaurant.id}')">
                    <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title fw-bold">${restaurant.name}</h5>
                            <span class="restaurant-rating">
                                <i class="fas fa-star"></i> ${restaurant.rating}
                            </span>
                        </div>
                        <p class="card-text text-muted">${restaurant.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-clock me-1"></i>${restaurant.deliveryTime} min
                            </small>
                            <small class="text-muted">
                                <i class="fas fa-truck me-1"></i>$${restaurant.deliveryFee}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    container.html(html);
}

function viewRestaurantMenu(restaurantId) {
    localStorage.setItem('selectedRestaurant', restaurantId);
    window.location.href = 'menu.html';
}

// Menu functions
function loadMenuItems() {
    const container = $('#menu-items-container');
    if (container.length === 0) return;
    
    const selectedRestaurant = localStorage.getItem('selectedRestaurant');
    let itemsToShow = menuItems;
    
    if (selectedRestaurant) {
        itemsToShow = menuItems.filter(item => item.restaurant === selectedRestaurant);
        // Update page title with restaurant name
        const restaurant = restaurants.find(r => r.id === selectedRestaurant);
        if (restaurant) {
            $('h1').text(`${restaurant.name} - Menu`);
        }
    }
    
    displayMenuItems(itemsToShow);
}

function displayMenuItems(items) {
    const container = $('#menu-items-container');
    if (items.length === 0) {
        container.html(`
            <div class="col-12 text-center">
                <div class="py-5">
                    <i class="fas fa-utensils fa-3x text-muted mb-3"></i>
                    <h4>No items found</h4>
                    <p class="text-muted">Try adjusting your filters</p>
                </div>
            </div>
        `);
        return;
    }
    
    let html = '';
    items.forEach(item => {
        const restaurant = restaurants.find(r => r.id === item.restaurant);
        const badges = item.dietary.map(diet => 
            `<span class="badge bg-success me-1">${diet}</span>`
        ).join('');
        
        html += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card menu-item h-100" onclick="showItemModal('${item.id}')">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    ${item.popularity > 90 ? '<div class="menu-item-badge">Popular</div>' : ''}
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title fw-bold">${item.name}</h5>
                            <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                        </div>
                        <p class="card-text text-muted small">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">${restaurant.name}</small>
                            <div>${badges}</div>
                        </div>
                        <button class="btn btn-primary w-100" onclick="event.stopPropagation(); addToCart('${item.id}')">
                            <i class="fas fa-plus me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    container.html(html);
}

function setupMenuFilters() {
    // Filter event listeners
    $('#restaurant-filter, #category-filter, #dietary-filter, #price-filter').on('change', applyMenuFilters);
    $('#menu-search').on('input', applyMenuFilters);
    $('input[name="sort"]').on('change', applyMenuFilters);
}

function applyMenuFilters() {
    const restaurantFilter = $('#restaurant-filter').val();
    const categoryFilter = $('#category-filter').val();
    const dietaryFilter = $('#dietary-filter').val();
    const priceFilter = $('#price-filter').val();
    const searchTerm = $('#menu-search').val().toLowerCase();
    const sortBy = $('input[name="sort"]:checked').val();
    
    let filteredItems = menuItems.filter(item => {
        const matchesRestaurant = !restaurantFilter || item.restaurant === restaurantFilter;
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesDietary = !dietaryFilter || item.dietary.includes(dietaryFilter);
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                             item.description.toLowerCase().includes(searchTerm);
        
        let matchesPrice = true;
        if (priceFilter === 'low') matchesPrice = item.price <= 15;
        else if (priceFilter === 'medium') matchesPrice = item.price > 15 && item.price <= 25;
        else if (priceFilter === 'high') matchesPrice = item.price > 25;
        
        return matchesRestaurant && matchesCategory && matchesDietary && matchesSearch && matchesPrice;
    });
    
    // Apply sorting
    if (sortBy === 'price-low') {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredItems.sort((a, b) => b.price - a.price);
    } else {
        filteredItems.sort((a, b) => b.popularity - a.popularity);
    }
    
    displayMenuItems(filteredItems);
}

function showItemModal(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const restaurant = restaurants.find(r => r.id === item.restaurant);
    
    if (!item) return;
    
    const badges = item.dietary.map(diet => 
        `<span class="badge bg-success me-1">${diet}</span>`
    ).join('');
    
    $('#itemModalTitle').text(item.name);
    $('#itemModalBody').html(`
        <div class="row">
            <div class="col-md-6">
                <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
            </div>
            <div class="col-md-6">
                <h5 class="fw-bold text-primary">$${item.price.toFixed(2)}</h5>
                <p class="text-muted">${item.description}</p>
                <p><strong>Restaurant:</strong> ${restaurant.name}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <div class="mb-3">${badges}</div>
                <div class="d-flex align-items-center">
                    <label class="me-3">Quantity:</label>
                    <button class="btn btn-outline-secondary btn-sm" onclick="changeModalQuantity(-1)">-</button>
                    <span class="mx-3 fw-bold" id="modal-quantity">1</span>
                    <button class="btn btn-outline-secondary btn-sm" onclick="changeModalQuantity(1)">+</button>
                </div>
            </div>
        </div>
    `);
    
    $('#addToCartBtn').attr('onclick', `addToCartFromModal('${itemId}')`);
    $('#itemModal').modal('show');
}

function changeModalQuantity(change) {
    const quantitySpan = $('#modal-quantity');
    let quantity = parseInt(quantitySpan.text()) + change;
    if (quantity < 1) quantity = 1;
    quantitySpan.text(quantity);
}

function addToCartFromModal(itemId) {
    const quantity = parseInt($('#modal-quantity').text());
    addToCart(itemId, quantity);
    $('#itemModal').modal('hide');
}

// Cart functions
function addToCart(itemId, quantity = 1) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    updateCartModal();
    
    // Show success message
    showToast(`Added ${item.name} to cart!`, 'success');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    updateCartModal();
    loadCartItems(); // Reload cart page if we're on it
}

function updateCartQuantity(itemId, newQuantity) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            updateCartModal();
            loadCartItems();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    updateCartModal();
    loadCartItems();
    showToast('Cart cleared!', 'info');
}

function saveCart() {
    localStorage.setItem('foodhub_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    $('#cart-count, #cart-modal-count').text(count);
}

function updateCartModal() {
    const cartItemsDiv = $('#cart-items');
    
    if (cart.length === 0) {
        cartItemsDiv.html(`
            <div class="text-center py-5 text-muted">
                <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                <h5>Your cart is empty</h5>
                <p>Add some delicious items to get started!</p>
            </div>
        `);
        $('#cart-total').text('0.00');
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" width="50" height="50" class="rounded me-3" alt="${item.name}">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">$${item.price.toFixed(2)} each</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-secondary btn-sm me-2" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="fw-bold">${item.quantity}</span>
                    <button class="btn btn-outline-secondary btn-sm ms-2 me-3" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    <span class="fw-bold">$${itemTotal.toFixed(2)}</span>
                </div>
            </div>
        `;
    });
    
    cartItemsDiv.html(html);
    $('#cart-total').text(total.toFixed(2));
}

function loadCartItems() {
    const cartList = $('#cart-items-list');
    const emptyCart = $('#empty-cart');
    
    if (!cartList.length) return;
    
    if (cart.length === 0) {
        cartList.hide();
        emptyCart.show();
        updateOrderSummary(0);
        return;
    }
    
    cartList.show();
    emptyCart.hide();
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const restaurant = restaurants.find(r => r.id === item.restaurant);
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="cart-item border rounded p-3 mb-3">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                    </div>
                    <div class="col-md-4">
                        <h6 class="fw-bold mb-1">${item.name}</h6>
                        <small class="text-muted">${restaurant.name}</small>
                        <p class="text-muted small mb-0">${item.description}</p>
                    </div>
                    <div class="col-md-2">
                        <span class="fw-bold">$${item.price.toFixed(2)}</span>
                    </div>
                    <div class="col-md-3">
                        <div class="quantity-controls d-flex align-items-center">
                            <button class="btn btn-outline-danger btn-sm" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="mx-3 fw-bold">${item.quantity}</span>
                            <button class="btn btn-outline-success btn-sm" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col text-end">
                        <strong>Subtotal: $${itemTotal.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartList.html(html);
    updateOrderSummary(subtotal);
}

function updateOrderSummary(subtotal) {
    const deliveryFee = $('input[name="delivery"]:checked').val() === 'pickup' ? 0 : 3.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + deliveryFee + tax;
    
    $('#subtotal').text(`$${subtotal.toFixed(2)}`);
    $('#delivery-fee').text(deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`);
    $('#tax').text(`$${tax.toFixed(2)}`);
    $('#total, #checkout-total').text(`$${total.toFixed(2)}`);
    
    $('#checkout-btn').prop('disabled', subtotal === 0);
}

function setupDeliveryOptions() {
    $('input[name="delivery"]').on('change', function() {
        const subtotal = parseFloat($('#subtotal').text().replace('$', ''));
        updateOrderSummary(subtotal);
    });
}

function showCheckoutModal() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }
    $('#checkoutModal').modal('show');
}

function placeOrder() {
    const form = $('#checkout-form');
    
    if (!form[0].checkValidity()) {
        form[0].reportValidity();
        return;
    }
    
    // Generate order ID
    const orderId = 'FH' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Create order object
    const order = {
        id: orderId,
        items: [...cart],
        total: parseFloat($('#checkout-total').text().replace('$', '')),
        status: 'confirmed',
        timestamp: new Date(),
        deliveryType: $('input[name="delivery"]:checked').val()
    };
    
    // Save order to localStorage (in real app, would send to server)
    let orders = JSON.parse(localStorage.getItem('foodhub_orders')) || [];
    orders.push(order);
    localStorage.setItem('foodhub_orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Close modal and show success
    $('#checkoutModal').modal('hide');
    showToast(`Order placed successfully! Order ID: ${orderId}`, 'success', 5000);
    
    // Redirect to tracking page after short delay
    setTimeout(() => {
        localStorage.setItem('trackingOrderId', orderId);
        window.location.href = 'order-tracking.html';
    }, 2000);
}

// Order Tracking functions
function setupOrderTracking() {
    const trackingOrderId = localStorage.getItem('trackingOrderId');
    if (trackingOrderId) {
        $('#order-id-input').val(trackingOrderId);
        trackOrder();
        localStorage.removeItem('trackingOrderId');
    }
}

function trackOrder() {
    const orderId = $('#order-id-input').val().trim();
    
    if (!orderId) {
        showToast('Please enter an Order ID', 'warning');
        return;
    }
    
    // Simulate order lookup
    const orders = JSON.parse(localStorage.getItem('foodhub_orders')) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        $('#order-not-found').show();
        $('#order-details').hide();
        showToast('Order not found. Please check your Order ID.', 'error');
        return;
    }
    
    displayOrderDetails(order);
}

function displayOrderDetails(order) {
    $('#order-not-found').hide();
    $('#order-details').show();
    
    // Update order info
    $('#display-order-id').text(order.id);
    $('#display-restaurant').text('Multiple Restaurants');
    $('#display-order-time').text(new Date(order.timestamp).toLocaleString());
    $('#display-delivery-time').text(getEstimatedDeliveryTime(order.timestamp));
    $('#display-total').text(`$${order.total.toFixed(2)}`);
    $('#display-address').text('123 Main St, Anytown, ST 12345');
    
    // Show driver info if order is out for delivery
    if (order.status === 'out-for-delivery' || order.status === 'delivered') {
        $('#driver-info').show();
    }
    
    // Update tracking timeline
    updateTrackingTimeline(order);
    
    // Update current status
    updateCurrentStatus(order);
    
    // Show live map if order is out for delivery
    if (order.status === 'out-for-delivery') {
        $('#map-placeholder').hide();
        $('#live-map').show();
    }
}

function getEstimatedDeliveryTime(timestamp) {
    const orderTime = new Date(timestamp);
    const estimatedTime = new Date(orderTime.getTime() + 35 * 60000); // Add 35 minutes
    return estimatedTime.toLocaleTimeString();
}

function updateTrackingTimeline(order) {
    const statuses = [
        { key: 'confirmed', title: 'Order Confirmed', description: 'Your order has been received', icon: 'fas fa-check-circle' },
        { key: 'preparing', title: 'Preparing Food', description: 'Restaurant is preparing your order', icon: 'fas fa-utensils' },
        { key: 'ready', title: 'Ready for Pickup', description: 'Your order is ready', icon: 'fas fa-box' },
        { key: 'out-for-delivery', title: 'Out for Delivery', description: 'Driver is on the way', icon: 'fas fa-truck' },
        { key: 'delivered', title: 'Delivered', description: 'Order has been delivered', icon: 'fas fa-home' }
    ];
    
    const currentStatusIndex = statuses.findIndex(s => s.key === order.status);
    
    let html = '';
    statuses.forEach((status, index) => {
        const isCompleted = index <= currentStatusIndex;
        const isActive = index === currentStatusIndex;
        const time = getStatusTime(order.timestamp, index);
        
        html += `
            <div class="timeline-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
                <div class="timeline-icon">
                    <i class="${status.icon}"></i>
                </div>
                <div class="timeline-content">
                    <h6 class="fw-bold mb-1">${status.title}</h6>
                    <p class="text-muted mb-1">${status.description}</p>
                    <small class="text-muted">${isCompleted ? time : ''}</small>
                </div>
            </div>
        `;
    });
    
    $('#tracking-timeline').html(html);
}

function getStatusTime(orderTime, statusIndex) {
    const time = new Date(orderTime);
    time.setMinutes(time.getMinutes() + (statusIndex * 8)); // 8 minutes between each status
    return time.toLocaleTimeString();
}

function updateCurrentStatus(order) {
    const statusConfig = {
        'confirmed': {
            title: 'Order Confirmed',
            description: 'Your order has been received and is being prepared',
            icon: 'fas fa-check-circle text-success'
        },
        'preparing': {
            title: 'Preparing Your Order',
            description: 'The restaurant is preparing your delicious meal',
            icon: 'fas fa-utensils text-warning'
        },
        'ready': {
            title: 'Ready for Pickup',
            description: 'Your order is ready and waiting for the driver',
            icon: 'fas fa-box text-info'
        },
        'out-for-delivery': {
            title: 'Out for Delivery',
            description: 'Your order is on the way! Driver will be there soon.',
            icon: 'fas fa-truck text-primary'
        },
        'delivered': {
            title: 'Delivered',
            description: 'Your order has been successfully delivered. Enjoy!',
            icon: 'fas fa-home text-success'
        }
    };
    
    const config = statusConfig[order.status] || statusConfig.confirmed;
    
    $('#current-status-icon').html(`<i class="${config.icon}"></i>`);
    $('#current-status-title').text(config.title);
    $('#current-status-description').text(config.description);
    $('#current-status-time').text(new Date().toLocaleTimeString());
    
    // Simulate order progression
    if (order.status !== 'delivered') {
        setTimeout(() => {
            simulateOrderProgress(order);
        }, 30000); // Update every 30 seconds
    }
}

function simulateOrderProgress(order) {
    const progressOrder = ['confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered'];
    const currentIndex = progressOrder.indexOf(order.status);
    
    if (currentIndex < progressOrder.length - 1) {
        order.status = progressOrder[currentIndex + 1];
        
        // Update localStorage
        const orders = JSON.parse(localStorage.getItem('foodhub_orders')) || [];
        const orderIndex = orders.findIndex(o => o.id === order.id);
        if (orderIndex !== -1) {
            orders[orderIndex] = order;
            localStorage.setItem('foodhub_orders', JSON.stringify(orders));
        }
        
        // Refresh display
        displayOrderDetails(order);
        
        // Show notification
        showToast(`Order status updated: ${order.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`, 'info');
    }
}

function loadRecentOrders() {
    const container = $('#recent-orders');
    if (!container.length) return;
    
    const orders = JSON.parse(localStorage.getItem('foodhub_orders')) || [];
    const recentOrders = orders.slice(-3).reverse(); // Get last 3 orders
    
    if (recentOrders.length === 0) {
        container.html(`
            <div class="col-12 text-center">
                <div class="py-5">
                    <i class="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                    <h5>No recent orders</h5>
                    <p class="text-muted">Your recent orders will appear here</p>
                    <a href="menu.html" class="btn btn-primary">Browse Menu</a>
                </div>
            </div>
        `);
        return;
    }
    
    let html = '';
    recentOrders.forEach(order => {
        const orderDate = new Date(order.timestamp).toLocaleDateString();
        const statusBadge = getStatusBadge(order.status);
        
        html += `
            <div class="col-lg-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h6 class="card-title fw-bold">Order #${order.id}</h6>
                            ${statusBadge}
                        </div>
                        <p class="text-muted small mb-2">${orderDate}</p>
                        <p class="text-muted small mb-2">${order.items.length} items</p>
                        <p class="fw-bold mb-3">Total: $${order.total.toFixed(2)}</p>
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="$('#order-id-input').val('${order.id}'); trackOrder();">
                            <i class="fas fa-search me-1"></i>Track Order
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.html(html);
}

function getStatusBadge(status) {
    const badges = {
        'confirmed': '<span class="badge bg-info">Confirmed</span>',
        'preparing': '<span class="badge bg-warning">Preparing</span>',
        'ready': '<span class="badge bg-primary">Ready</span>',
        'out-for-delivery': '<span class="badge bg-success">Out for Delivery</span>',
        'delivered': '<span class="badge bg-success">Delivered</span>'
    };
    
    return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
}

// Utility functions
function showToast(message, type = 'info', duration = 3000) {
    const toastHtml = `
        <div class="toast align-items-center text-white bg-${type === 'error' ? 'danger' : type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-${getToastIcon(type)} me-2"></i>${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    // Create toast container if it doesn't exist
    let toastContainer = $('#toast-container');
    if (toastContainer.length === 0) {
        $('body').append('<div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
        toastContainer = $('#toast-container');
    }
    
    const toastElement = $(toastHtml);
    toastContainer.append(toastElement);
    
    const toast = new bootstrap.Toast(toastElement[0], { delay: duration });
    toast.show();
    
    // Remove element after hide
    toastElement.on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Initialize cart modal updates when page loads
$(document).ready(function() {
    updateCartModal();
});
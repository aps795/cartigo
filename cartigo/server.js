const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Mock Database - Products
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 5,
    reviews: 2450,
    category: "Electronics",
    image: "📷",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    specs: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Noise Cancellation": "Active",
      "Frequency Response": "20Hz - 20kHz",
      "Driver Size": "40mm"
    },
    inStock: true,
    reviews_list: [
      { author: "John D.", rating: 5, text: "Excellent sound quality and battery life!" },
      { author: "Sarah M.", rating: 5, text: "Very comfortable to wear for long hours." }
    ]
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 4999,
    originalPrice: 8499,
    discount: 40,
    rating: 4,
    reviews: 1890,
    category: "Electronics",
    image: "⌚",
    description: "Feature-rich smartwatch with health tracking, GPS, and 7-day battery.",
    specs: {
      "Display": "1.6\" AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "5ATM",
      "Sensors": "Heart Rate, SpO2, Accelerometer",
      "OS": "WearOS 3.0"
    },
    inStock: true,
    reviews_list: [
      { author: "Mike P.", rating: 4, text: "Great features, battery could be better." }
    ]
  },
  {
    id: 3,
    name: "Portable Charger 20000mAh",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 5,
    reviews: 3120,
    category: "Accessories",
    image: "💻",
    description: "Fast-charging portable power bank with dual USB ports and LED display.",
    specs: {
      "Capacity": "20000mAh",
      "Input": "USB-C, Micro USB",
      "Output": "Dual USB-A + USB-C",
      "Charging Speed": "18W Fast Charge",
      "Weight": "350g"
    },
    inStock: true,
    reviews_list: []
  },
  {
    id: 4,
    name: "Bluetooth Speaker Portable",
    price: 2499,
    originalPrice: 4549,
    discount: 45,
    rating: 4,
    reviews: 2340,
    category: "Electronics",
    image: "🎧",
    description: "Compact wireless speaker with surround sound and waterproof design.",
    specs: {
      "Power": "20W",
      "Battery Life": "12 hours",
      "Water Resistance": "IPX7",
      "Bluetooth": "5.0",
      "Range": "10m"
    },
    inStock: true,
    reviews_list: []
  },
  {
    id: 5,
    name: "Designer Women's Dress",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 5,
    reviews: 1250,
    category: "Fashion",
    image: "👗",
    description: "Elegant designer dress perfect for parties and special occasions.",
    specs: {
      "Material": "100% Premium Fabric",
      "Sizes": "XS-XXL",
      "Color": "Navy Blue",
      "Care": "Dry Clean",
      "Style": "A-Line"
    },
    inStock: true,
    reviews_list: []
  },
  {
    id: 6,
    name: "Gaming RGB Headset",
    price: 3999,
    originalPrice: 7499,
    discount: 47,
    rating: 4,
    reviews: 2120,
    category: "Gaming",
    image: "🎧",
    description: "Professional gaming headset with RGB lighting and 7.1 surround sound.",
    specs: {
      "Drivers": "50mm",
      "Impedance": "32Ω",
      "Frequency": "20Hz-20kHz",
      "Microphone": "Noise-Cancelling",
      "RGB Lighting": "Yes"
    },
    inStock: true,
    reviews_list: []
  },
  {
    id: 7,
    name: "4K Digital Camera",
    price: 34999,
    originalPrice: 49999,
    discount: 30,
    rating: 5,
    reviews: 1890,
    category: "Electronics",
    image: "📷",
    description: "Professional 4K camera with advanced autofocus and weather sealing.",
    specs: {
      "Sensor": "Full-Frame 24MP",
      "Video": "4K@60fps",
      "ISO Range": "100-25600",
      "Autofocus": "AI-Powered",
      "Battery": "810 shots per charge"
    },
    inStock: false,
    reviews_list: []
  },
  {
    id: 8,
    name: "PlayStation 5 Console",
    price: 49999,
    originalPrice: 54990,
    discount: 9,
    rating: 5,
    reviews: 4560,
    category: "Gaming",
    image: "🎮",
    description: "Next-gen gaming console with ultra-fast SSD and stunning graphics.",
    specs: {
      "Processor": "Custom AMD Ryzen",
      "RAM": "16GB GDDR6",
      "Storage": "825GB SSD",
      "GPU": "Custom RDNA 2",
      "Resolution": "Up to 8K"
    },
    inStock: true,
    reviews_list: []
  }
];

// Cart storage (in-memory)
let carts = {};

// ==================== PRODUCTS API ====================

// Get all products
app.get('/api/products', (req, res) => {
  const { category, search, sort } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  res.json({ success: true, data: filtered, count: filtered.length });
});

// Get single product detail
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Get product categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json({ success: true, data: categories });
});

// ==================== CART API ====================

// Create or get cart session
app.post('/api/cart/create', (req, res) => {
  const cartId = 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  carts[cartId] = { items: [], total: 0, createdAt: new Date() };
  res.json({ success: true, cartId, cart: carts[cartId] });
});

// Get cart
app.get('/api/cart/:cartId', (req, res) => {
  const cart = carts[req.params.cartId];
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }
  res.json({ success: true, data: cart });
});

// Add to cart
app.post('/api/cart/:cartId/add', (req, res) => {
  const { productId, quantity } = req.body;
  const cart = carts[req.params.cartId];

  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  const product = products.find(p => p.id == productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const existingItem = cart.items.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    cart.items.push({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: quantity || 1,
      image: product.image
    });
  }

  // Recalculate total
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  res.json({ success: true, message: 'Added to cart', cart });
});

// Remove from cart
app.post('/api/cart/:cartId/remove', (req, res) => {
  const { productId } = req.body;
  const cart = carts[req.params.cartId];

  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  cart.items = cart.items.filter(item => item.id !== productId);
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  res.json({ success: true, message: 'Removed from cart', cart });
});

// Update quantity
app.post('/api/cart/:cartId/update', (req, res) => {
  const { productId, quantity } = req.body;
  const cart = carts[req.params.cartId];

  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  const item = cart.items.find(i => i.id === productId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not in cart' });
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(i => i.id !== productId);
  } else {
    item.quantity = quantity;
  }

  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.json({ success: true, message: 'Cart updated', cart });
});

// Clear cart
app.post('/api/cart/:cartId/clear', (req, res) => {
  const cart = carts[req.params.cartId];
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }
  cart.items = [];
  cart.total = 0;
  res.json({ success: true, message: 'Cart cleared', cart });
});

// ==================== ORDER API ====================

// Place order
app.post('/api/orders', (req, res) => {
  const { cartId, customer } = req.body;
  const cart = carts[cartId];

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  const order = {
    orderId: 'ORD_' + Date.now(),
    customer,
    items: cart.items,
    total: cart.total,
    status: 'Confirmed',
    createdAt: new Date(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  };

  // Clear cart after order
  cart.items = [];
  cart.total = 0;

  res.json({ success: true, message: 'Order placed successfully', order });
});

// ==================== SEARCH API ====================

// Search products
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ success: false, message: 'Search query required' });
  }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  );

  res.json({ success: true, data: results, count: results.length });
});

// ==================== STATIC FILES ====================

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cartigo.html'));
});

app.get('/product/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'product-detail.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   CARTIGO E-COMMERCE API SERVER        ║
  ║   Running on http://localhost:${PORT}   ║
  ╚════════════════════════════════════════╝

  Available Endpoints:
  
  PRODUCTS:
  - GET  /api/products                     (List all products)
  - GET  /api/products?category=X          (Filter by category)
  - GET  /api/products?search=X            (Search products)
  - GET  /api/products/:id                 (Get product detail)
  - GET  /api/categories                   (Get all categories)
  - GET  /api/search?q=X                   (Search products)

  CART:
  - POST /api/cart/create                  (Create new cart)
  - GET  /api/cart/:cartId                 (Get cart)
  - POST /api/cart/:cartId/add             (Add to cart)
  - POST /api/cart/:cartId/remove          (Remove from cart)
  - POST /api/cart/:cartId/update          (Update quantity)
  - POST /api/cart/:cartId/clear           (Clear cart)

  ORDERS:
  - POST /api/orders                       (Place order)
  `);
});

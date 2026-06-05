# CARTIGO - E-Commerce Platform

A full-stack e-commerce platform with product catalog, shopping cart, and order management similar to Amazon and Flipkart.

## Features

✨ **Frontend**
- Responsive product catalog
- Product detail pages with specifications and reviews
- Shopping cart management
- Dark mode toggle
- Wishlist functionality
- Search and filter products
- Dynamic pricing and discounts

🔧 **Backend API**
- RESTful API endpoints
- Product management
- Shopping cart operations
- Order processing
- Search and filtering
- Mock database with product data

## Project Structure

```
cartigo/
├── cartigo.html          # Main shopping page
├── cartigo.css           # Styles (separated from HTML)
├── cartigo.js            # Frontend JavaScript with API integration
├── product-detail.html   # Product detail page
├── server.js             # Express server with API endpoints
├── package.json          # Node.js dependencies
└── README.md             # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Install Dependencies**
   ```bash
   cd /home/abhishekps/cartigo
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Main page: http://localhost:3000
   - Product detail: http://localhost:3000/product/1
   - API documentation: See endpoints below

## API Endpoints

### Products API

- **GET /api/products**
  - Get all products
  - Query params: `category`, `search`, `sort` (price-low, price-high, rating)
  
- **GET /api/products/:id**
  - Get single product details
  
- **GET /api/categories**
  - Get all product categories
  
- **GET /api/search?q=query**
  - Search products

### Cart API

- **POST /api/cart/create**
  - Create new cart session
  - Returns: `{ success, cartId }`
  
- **GET /api/cart/:cartId**
  - Get cart contents
  
- **POST /api/cart/:cartId/add**
  - Add product to cart
  - Body: `{ productId, quantity }`
  
- **POST /api/cart/:cartId/remove**
  - Remove product from cart
  - Body: `{ productId }`
  
- **POST /api/cart/:cartId/update**
  - Update product quantity
  - Body: `{ productId, quantity }`
  
- **POST /api/cart/:cartId/clear**
  - Clear entire cart

### Orders API

- **POST /api/orders**
  - Place order
  - Body: `{ cartId, customer: { name, email, address } }`
  - Returns: `{ success, order }`

## Mock Data

The server comes with 8 pre-loaded products:
1. Premium Wireless Headphones
2. Smart Watch Pro
3. Portable Charger 20000mAh
4. Bluetooth Speaker Portable
5. Designer Women's Dress
6. Gaming RGB Headset
7. 4K Digital Camera
8. PlayStation 5 Console

## Usage Examples

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Search Products
```bash
curl "http://localhost:3000/api/search?q=headphones"
```

### Create Cart
```bash
curl -X POST http://localhost:3000/api/cart/create
```

### Add to Cart
```bash
curl -X POST http://localhost:3000/api/cart/{cartId}/add \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

## Frontend Features

### Product Browsing
- View all products with prices, ratings, and discounts
- Filter by category
- Sort by price or rating
- Search functionality

### Product Details
- Full product specifications
- Customer reviews
- Related products
- In-stock status
- Add to cart from detail page

### Shopping Cart
- Add/remove products
- Update quantities
- View total price
- Local cart persistence using localStorage

### Dark Mode
- Toggle between light and dark themes
- User preference saved to localStorage

## Technologies Used

### Frontend
- HTML5
- CSS3 (Responsive Design)
- Vanilla JavaScript
- Fetch API for API calls

### Backend
- Node.js
- Express.js
- CORS middleware
- Body Parser

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and accounts
- Payment gateway integration
- Order tracking
- Review submission
- Inventory management
- Admin dashboard
- Real-time notifications

## File Separation

This project demonstrates best practices by separating concerns:
- **cartigo.html** - Markup only
- **cartigo.css** - All styles
- **cartigo.js** - Client-side logic
- **server.js** - Server and API logic

## Notes

- Cart data is stored in-memory on the server (resets on server restart)
- Use localStorage for client-side cart ID persistence
- CORS is enabled for local development
- All prices are in Indian Rupees (₹)

## License

ISC

## Support

For issues or questions, contact the development team.

---

**Happy Shopping! 🛒**

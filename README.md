CLIENT SIDE
1.  cd...to client
2.  npm start
3.  register a admin use the checkbox on the UI.
4. Go ManageProduct Link on the nav bar.
5. Add each products with details / otherway you check the point number:5 (SERVER SIDE).
6. You can edit, update and delete products Only Admins.
7. Users have to deal cart, products details and wishlist features.


SERVER SIDE

1.create a db.js inside the config folder.

2.Enter your :
                MONGO_URI=
                JWT_SECRET= 
                PORT=
                
3.Install dependencies if needed (mandotory install Nodemon).

4.cd.. to server folder and run the command
                npx nodemon server.js

                
5.Go to browser window and console.log(localStorage.Token) on browser console. you got a token and copy the data.
  Make a api req as
        POST http://localhost:5000/api/products/bulk
        add the copied token into the auth Bearer,
        body json is array [{},{},...etc.],

        
        
        [
    {
    "name": "Wireless Mouse",
    "description": "A sleek and ergonomic wireless mouse with a long-lasting battery.",
    "price": 35.99,
    "category": "Electronics",
    "image": "https://th.bing.com/th/id/OIP.KbrT2F1y-cSObzRQ_jvd9QHaHa?rs=1&pid=ImgDetMain",
    "stock": 150
    },
    {
    "name": "Bluetooth Headphones",
    "description": "High-quality Bluetooth headphones with noise-cancellation and a built-in microphone.",
    "price": 99.99,
    "category": "Electronics",
    "image": "https://www.bhphotovideo.com/images/images1000x1000/muzik_mzhp0101u_one_wireless_bluetooth_headphones_1291815.jpg",
    "stock": 75
    },
    {
    "name": "Smartphone Stand",
    "description": "Adjustable smartphone stand suitable for all phone sizes.",
    "price": 15.99,
    "category": "Accessories",
    "image": "https://m.media-amazon.com/images/I/61sEWFS6bIL.jpg",
    "stock": 200
    },
    {
    "name": "Yoga Mat",
    "description": "Durable and non-slip yoga mat with extra cushioning for comfort.",
    "price": 25.5,
    "category": "Fitness",
    "image": "https://cdn.webshopapp.com/shops/281654/files/434999527/yoga-mat-8mm.jpg",
    "stock": 100
    },
    {
    "name": "Stainless Steel Water Bottle",
    "description": "Insulated water bottle that keeps drinks hot or cold for hours.",
    "price": 18.75,
    "category": "Kitchenware",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsbWCLBbI2IKvQVgVKvIB157mITEst4ABZNw&s",
    "stock": 50
    },
    {
    "name": "Electric Kettle",
    "description": "Fast boiling electric kettle with automatic shut-off feature.",
    "price": 40,
    "category": "Kitchenware",
    "image": "https://i5.walmartimages.com/asr/2d07cbcf-ce32-419f-854b-0187ca1002a0.6415d5df576987404f0a9c3ee0020114.jpeg",
    "stock": 80
    },
    {
    "name": "Office Chair",
    "description": "Ergonomic office chair with adjustable height and lumbar support.",
    "price": 150,
    "category": "Furniture",
    "image": "https://www.ikea.com/in/en/images/products/hattefjaell-office-chair-with-armrests-gunnared-dark-grey-black__1179620_pe896020_s5.jpg",
    "stock": 30
    },
    {
    "name": "Desk Lamp",
    "description": "LED desk lamp with adjustable brightness and flexible arm.",
    "price": 22,
    "category": "Furniture",
    "image": "https://p.turbosquid.com/ts-thumb/Q7/Wp1fEw/2x/04/jpg/1660408556/1920x1080/fit_q87/611615340deb1361e10272abf30a72266a86a842/04.jpg",
    "stock": 60
    },
    {
    "name": "Smartwatch",
    "description": "Feature-rich smartwatch with heart rate monitor, GPS, and 10-day battery life.",
    "price": 120,
    "category": "Electronics",
    "image": "https://th.bing.com/th/id/OIP.GcX_xxVx3YBFVR0hzwL5EwAAAA?rs=1&pid=ImgDetMain",
    "stock": 0
    },
    {
    "name": "Ultrabook Pro 15",
    "description": "Sleek and powerful ultrabook with a 15-inch Retina display, Intel i7 processor, 16GB RAM, and 512GB SSD. Ideal for professionals and creatives.",
    "price": 1299.99,
    "category": "Electronics",
    "image": "https://images.yaoota.com/G150yXnwvi2vXLue9ZG7TMKZzKA=/trim/yaootaweb-production/media/crawledproductimages/839f964cd1ade4581c75c4a0fc636ba6b53c9a54.jpg",
    "stock": 0
    },
    {
    "name": "Moisturizing Face Cream",
    "description": "A hydrating face cream enriched with natural ingredients to keep your skin soft and glowing.",
    "price": 24.99,
    "category": "Cosmetics",
    "image": "https://images-cdn.ubuy.co.in/64c5ea947168f02c0a76f9ec-pond-s-dry-skin-cream-facial.jpg",
    "stock": null
    }
    ]
submit the request.

6. Manage the All project from front-end.

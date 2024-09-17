// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListing from './components/ProductListing/ProductListing.js';
import SingleProduct from './components/SingleProduct/SingleProduct.js';
import Cart from './components/Cart/Cart.js';
import Wishlist from './components/Wishlist/Wishlist.js';
import Navbar from './components/Navbar/Navbar.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import AddProduct from './components/Admin/AddProduct/AddProduct.js';
import ProductList from './components/Admin/ProductList/ProductList.js';
import EditProduct from './components/Admin/EditProduct/EditProduct.js';
import PrivateRoute from './utils/PrivateRoute.js';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<PrivateRoute element={<AddProduct />} />} />
        <Route path="/products" element={<PrivateRoute element={<ProductList />} />} />
        <Route path="/edit-product/:id" element={<PrivateRoute element={<EditProduct />} />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Fixed import typo
import { isAdmin } from '../../utils/auth';
import './Navbar.css';

const Navbar = () => {
    const [loggedOut, setLoggedOut] = useState(localStorage.Token);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const admin = isAdmin();

    useEffect(() => {
        const Token = localStorage.getItem('Token');
        if (Token) {
            try {
                const decodedToken = jwtDecode(Token);
                setUser(decodedToken);
                setLoggedOut(decodedToken);
            } catch (error) {
                console.error('Error decoding token:', error);
                handleLogout();
            }
        }
    }, [loggedOut]);

    const handleLogout = () => {
        localStorage.clear();
        setLoggedOut('');
        setUser(null);
        navigate('/login');
    };

    // Function to handle menu close when a link is clicked
    const handleMenuClose = () => {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.checked = false;
        }
    };

    return (
        <nav className="navbar">
            <h2 onClick={() => { navigate("/") }}>Shopify</h2>
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">
                <span></span>
            </label>

            {/* Navigation menu */}
            <div className="menu">
                <Link to="/" className="nav-link" onClick={handleMenuClose}>Home</Link>
                <Link to="/cart" className="nav-link" onClick={handleMenuClose}>Cart</Link>
                <Link to="/wishlist" className="nav-link" onClick={handleMenuClose}>Wishlist</Link>
                {admin && (
                    <Link to="/add-product" className="nav-link" onClick={handleMenuClose}>Manage Product</Link>
                )}
                {user ? (
                    <div className="navbar-user-info">
                        <span>Welcome, {user.username}</span>
                        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
                    </div>
                ) : (
                    <Link to="/login" className="login-btn" onClick={handleMenuClose}>Log In</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

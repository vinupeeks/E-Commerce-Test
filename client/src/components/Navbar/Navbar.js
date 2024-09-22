// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
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
                console.error('Error decoding token:', error.response.data);
                handleLogout();
            }
        }
    }, [localStorage.Token]);

    const handleLogout = () => {
        localStorage.clear();
        setLoggedOut('');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            {/* Checkbox and menu icon for the hamburger menu */}
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">
                <span></span>
            </label>

            {/* Navigation menu */}
            <div className="menu">
                <button><Link to="/" className="nav-link">Home</Link></button>
                <button><Link to="/cart" className="nav-link">Cart</Link></button>
                <button><Link to="/wishlist" className="nav-link">Wishlist</Link></button>
                {admin && (
                    <button><Link to="/add-product" className="nav-link">Manage Product</Link></button>
                )}
                {user ? (
                    <div className="navbar-user-info">
                        <span>Welcome, {user.username}</span>
                        <button onClick={handleLogout}>LogOut</button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button>LogIn</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

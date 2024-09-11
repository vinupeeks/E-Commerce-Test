// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
    }, [localStorage.Token])

    const handleLogout = () => {
        localStorage.clear();
        setLoggedOut('')
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to="/wishlist" className="nav-link">Wishlist</Link>
            {admin && (
                <Link to="/add-product" className="nav-link">Manage Product</Link>
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
        </nav>
    );
};

export default Navbar;

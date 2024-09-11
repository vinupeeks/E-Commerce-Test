import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../api/authService'; 
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token } = await login(email, password);
            localStorage.setItem('Token', token);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
                <button type="button" onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
};

export default Login;

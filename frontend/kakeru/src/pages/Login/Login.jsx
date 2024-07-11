import './Login.css';
import React, { useState } from 'react';
import { useAuth } from '../../provider/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            <section className='presentation-section'>
                <h1>Kakeru</h1>
                <h2>Everyone can draw</h2>
                <img src="/assets/logos/kakeru-logo.svg" alt="Kakeru Logo" />
            </section>
            <section className='login-section'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="email"
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <button type="submit">Login</button>
                </form>
                <Link to="/register">Register</Link>
            </section>
        </>
    );
};

export default Login;

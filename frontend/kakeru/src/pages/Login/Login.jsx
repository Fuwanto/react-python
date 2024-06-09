import React, { useState } from 'react';
import { useAuth } from '../../provider/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        let bodyContent = formData;

        await login(bodyContent);
    };

    return (
        <div>
            <h1>Kakeru</h1>
            <h2>Everyone can draw</h2>
            <img src="/assets/logos/kakeru-logo.svg" alt="Kakeru Logo" />
            <h1>Login</h1>
            <form>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    );
};

export default Login;

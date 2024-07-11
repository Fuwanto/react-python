import React, { useState } from 'react';
import { apiService } from '../../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await apiService.request('/users/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    username: username,
                    email: email,
                    password: password
                },
            });

            if (response.status === 200) {
                const data = response.data;
                alert(data);
            } else {
                const errorData = response.data;
                alert(errorData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;

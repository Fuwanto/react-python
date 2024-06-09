import React, { useState } from 'react';
import { apiWithoutCredentials } from '../../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {

            let bodyContent = JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            });

            const response = await apiWithoutCredentials.request('/users/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: bodyContent,
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
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
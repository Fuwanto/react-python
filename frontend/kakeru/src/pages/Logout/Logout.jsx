import React from 'react';
import { useAuth } from '../../provider/AuthContext';

const Logout = () => {
    const { logout } = useAuth();
    logout();
    return (
        <div>Logout</div>
    );
}

export default Logout;
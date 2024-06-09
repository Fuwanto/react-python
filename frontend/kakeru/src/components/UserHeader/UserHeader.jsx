import './UserHeader.css';
import { React } from 'react';
import { getUserImageUrl } from '../../services/api';

const UserHeader = ({ userUsername, userId }) => {

    return (
        <header>
            <img src={getUserImageUrl(userId)} alt="User" />
            <h3>{userUsername}</h3>
        </header>
    );
};

export default UserHeader;
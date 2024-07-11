import './UserHeader.css';
import { React } from 'react';
import { getUserImageUrl } from '../../services/api';
import { Link } from 'react-router-dom';

const UserHeader = ({ userUsername, userId }) => {

    return (
        <section className='user-profile-header'>
            <img className='user-img-icon'
                src={getUserImageUrl(userId)}
                alt="User"
                loading='lazy'
            />
            <Link to={`/user/${userUsername}`} className='user-username-link'>{userUsername}</Link>
        </section>

    );
};

export default UserHeader;
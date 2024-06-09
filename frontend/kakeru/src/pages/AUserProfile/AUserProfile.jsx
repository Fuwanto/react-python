import React, { useEffect, useState } from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useParams } from 'react-router-dom';

const AUserProfile = () => {
    const { userUsername } = useParams();
    return (
        <UserProfile userUsername={userUsername} />
    );
}

export default AUserProfile;

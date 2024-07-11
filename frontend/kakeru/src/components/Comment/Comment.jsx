import './Comment.css';
import { React } from 'react';
import UserHeader from '../UserHeader/UserHeader';

const Comment = ({ userUsername, userId, content }) => {

    return (
        <>
            <section className='user-comment'>
                <UserHeader userUsername={userUsername} userId={userId} />
                <p className='content-comment'>{content}</p>
            </section>
        </>
    );
};

export default Comment;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LikePost from './LikePost';
import DeletePost from './DeletePost';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../feature/post.slice';

const Post = ({ post } ) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [newMessage, setNewMessage] = useState("")
    const userId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post.author === userId) {
            setIsAuthor(true);
        } else {
            setIsAuthor(false);
        }
    }, [userId])

    const handleEdit = () => {
        if (newMessage) {
            axios.put("http://localhost:5000/post/" + post._id, {
                message: newMessage,
            })
            dispatch(editPost([newMessage, post._id]));
        }
    }

    const dateFormater = (date) => {
        return new Date(date).toLocaleDateString("fr-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            seonc: "minute",
        })
    }
    return (
        <div className="card">
            <div className="card-header">
                <h3>{post.author}</h3>
                <p>posted at {dateFormater(post.createdAt)}</p>
            </div>
            {isEdit ? (
                <div className="edit-container">
                    <textarea defaultValue={post.message} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                    <button onClick={() => {
                        setIsEdit(false);
                        handleEdit();
                    }}
                    >Valider edition</button>
                </div>
            ) : (<p>{( newMessage ? newMessage : post.message)}</p>)}
            
            <div className="icons-part">
                <LikePost post={post} userId={userId} />
                {isAuthor && (
                    <div className="update-delete-icons">
                        <span id="update-btn" onClick={() => {
                            setIsEdit(!isEdit);
                            handleEdit();
                        }}>&#10000;</span>
                        <DeletePost postId={post._id}/>
                    </div>
                )

                }
            </div>
        </div>
    );
};

export default Post;
import React , { useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts } from '../feature/post.slice';

const NewPost = () => {
    const [message, setMessage] = useState("")
    const userId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    const handleForm = (e) => {
       e.preventDefault();

       const  data =  {
        message,
        author: userId,
        _id: Date.now(), //id provisoir pour erreur console en attendant le retour de la base de donnees
       }

       axios.post("http://localhost:5000/post/", data).then(() => {
        dispatch(createPost(data));
        //get post car il faut aller chercher creer par la DB
        dispatch(getPosts());
        });
        setMessage("")
    }
    return (
        <form className='new-post-container' onSubmit={(e) => handleForm(e)}>
            <textarea onChange={(e) => setMessage(e.target.value)} placeholder='Wesh negrito ?'
            value={message}></textarea>
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default NewPost;
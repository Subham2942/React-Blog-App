import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postSlice";
import { useNavigate, useParams } from "react-router-dom";

import {selectAllUsers} from '../users/usersSlice';

const EditPostForm = () =>{
    const {postId} = useParams();
    const navigate = useNavigate();

    const post = useSelector(state => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setrequestStatus] = useState('idle');

    const dispatch = useDispatch();

    if(!post){
        return (
            <section>
                <h2>Page Not Found</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e =>setContent(e.target.value);
    const onAuthorChanged =e => setUserId(e.target.value);

    const canSave = [title, content].every(Boolean) && requestStatus === "idle";

    const onSavePostClicked = () =>{
        if(canSave){
            try{
                setrequestStatus("pending");
                dispatch(updatePost({id: post.id, title, body:content, userId, reactions: post.reactions})).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${postId}`);
            }catch(err){
                console.log(err);
            }finally{
                setrequestStatus('idle');
            }
        }
    }
    const userOptions = users.map(user =>(
        <option
            key={user.id} 
            value={user.id}
        > {user.name} </option>
    ))

    const onDeletePostClicked = () =>{
        try{
            setrequestStatus("pending");
            dispatch(deletePost({id: post.ids})).unwrap();
            setTitle('');
            setContent('');
            setUserId('');
            navigate('/');
        }catch(err){
            console.log(err);
        }finally{
            setrequestStatus('idle');
        }
}

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title</label>
                <input 
                    type="text" 
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select name="postAuthor" defaultValue={userId} id="postAuthor" value={userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {userOptions}
                </select>
                <label htmlFor="postContent">Content</label>
                <textarea 
                name="postContent" 
                id="postContent"
                value={content}
                onChange={onContentChanged} 
                />
                <button 
                    onClick={onSavePostClicked} 
                    type="button" 
                    disabled={!canSave}
                >
                    Save Post
                </button>
                <button 
                    className="deleteButton"
                    onClick={onDeletePostClicked} 
                    type="button" 
                >
                    Delete Post
                </button>

            </form>
        </section>
    )

}

export default EditPostForm;


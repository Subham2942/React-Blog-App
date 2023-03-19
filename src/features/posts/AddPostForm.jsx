import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";

import { useNavigate } from "react-router-dom";

const AddPotForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title,content].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = (e) =>{
    if(canSave){
      try{
        setAddRequestStatus('pending');
        dispatch(addNewPost({title, body: content, userId})).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate('/');
      }catch(err){
        console.error("failed to asave the post", err);
      } finally{
        setAddRequestStatus('idle');
      }

    }
    
  }

  const userOptions = users.map(user =>{
    return(
      <option value={user.id} key={user.id} >
        {user.name}
      </option>
    )
    
  })

  return (
    <section>
      <h2>Add a New Post</h2>
      <form >
        <label htmlFor="postTitle">Post title</label>
        <input 
          type="text" 
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChanged}>
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
      </form>
    </section>
  )
}

export default AddPotForm;
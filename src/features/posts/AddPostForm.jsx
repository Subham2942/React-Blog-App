import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPotForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const onSavePostClicked = (e) =>{
    if(title && content){
      dispatch(
        postAdded(title, content, userId),
      );
    }

    setTitle("");
    setContent("");
    setUserId("");
  }

  const canSave = Boolean(title) && Boolean(content) ;

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
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from "./postSlice";
import { useEffect } from "react";

import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  
  useEffect(()=>{
    if(postStatus=== 'idle'){
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if(postStatus === "loading"){
    content = <p>"Loading...</p>;
  } else if(postStatus === "succeeded"){
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post  => <PostsExcerpt key={post.id} post={post} />)
  } else if(postStatus === "failed"){
    content = <p>{error}</p>;
  }

  return (
    <section>
        <h1>Posts</h1>
        {content}
    </section>
  )
}

export default PostsList
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from "./postSlice";
import { useEffect } from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

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

  const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map(post =>(
      <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0,101)}</p>

          <p className="postCredit">
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date} />
          </p>
          <ReactionButtons post={post} />
      </article>
  ))
  return (
    <section>
        <h1>Posts</h1>
        {renderedPosts}
    </section>
  )
}

export default PostsList
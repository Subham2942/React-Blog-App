import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";

import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<PostsList/>} />
        
        <Route path="post">
          <Route  index element={<AddPostForm/>} />
          <Route path=":postId" element={<SinglePostPage/>} />
          <Route path="edit/:postId" element={<EditPostForm/>} /> n
        </Route>

        <Route path="user">
          <Route  index element={<UsersList/>} />
          <Route path=":userId" element={<UserPage/>} /> n
        </Route>

        {/* catch all - can be replaced with 404 component */}
        <Route path="*"  element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

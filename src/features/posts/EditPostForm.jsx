import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost } from "./postSlice";
import { useParams, usenavigate } from "react-router-dom";

import {selectAllUsers} from '../users/usersSlice';

const EditPostForm = () =>{
    const {postId} = useParams();
}

export default EditPostForm;
import { useSelector } from "react-redux"
import { selectUsersById } from "./usersSlice"
import { selectPostsByUser } from "../posts/postSlice"
import {Link, useParams} from 'react-router-dom'

const UserPage = () => {
    const {userId} = useParams();
    const user =useSelector(state => selectUsersById(state, Number(userId)));

    const postForUser = useSelector(state => selectPostsByUser(state, Number(userId)));

    const postTitles = postForUser.map(post =>(
        <li key={post.id} >
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol> {postTitles} </ol>
        </section>
    )
}

export default UserPage
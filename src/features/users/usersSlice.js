import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () =>{
    try{
        const response = await axios.get(USERS_URL);
        return response.data;
    }
    catch(err){
        return err.message;
    }
})


const initialState = [
    {id: '0', name: 'Subham'},
    {id: '1', name: 'Jeff'},
    {id: '2', name: 'Mike'},
    {id: '3', name: 'Hannah'},
    {id: '4', name: 'Amit'},
    {id: '5', name: 'Michael'},
]

const usersSlice= createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state,action)=>{
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
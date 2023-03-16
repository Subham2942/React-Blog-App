import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Subham Grass'},
    {id: '1', name: 'Amar Santosh'},
    {id: '2', name: 'C Harshit'},
]

const usersSlice= createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
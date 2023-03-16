import { createSlice } from "@reduxjs/toolkit";

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
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
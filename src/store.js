import { configureStore, createSlice } from "@reduxjs/toolkit";






const currentUser = createSlice({
    name : 'currentUser',
    initialState :  '',
})









export default configureStore({
    reducer : {
        currentUser : currentUser.reducer,
    }
})
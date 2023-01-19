import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Action } from "@reduxjs/toolkit";






const illustQuantity = createSlice({
    name : "illustQuantity",
    initialState :  0,
    reducers : {
        renderQuantity(state, action){
           return state = action.payload
        },
        addIllust(state, action){
            return state = state+action.payload
        }
    }
})


export let {renderQuantity, addIllust} = illustQuantity.actions





export default configureStore({
    reducer : {
        illustQuantity : illustQuantity.reducer,
    }
})
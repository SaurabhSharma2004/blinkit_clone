import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import categoryReducer from "../slices/categorySlice";


const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    category : categoryReducer,
})

export default rootReducer;
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import categoryReducer from "../slices/categorySlice";
import productReducer from "../slices/productSlice";
import subCategoryReducer from "../slices/subCategorySlice";


const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    category : categoryReducer,
    product : productReducer,
    subCategory : subCategoryReducer,
})

export default rootReducer;
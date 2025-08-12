import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    subCategories: [],
    loading: false,
}



export const subCategorySlice = createSlice({
    name: "subCategory",
    initialState: initialState,
    reducers: {
        setSubCategories(state, action) {
            state.subCategories = [...action.payload];
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        addSubCategory(state, action) {
            // action.payload is the new sub-category object
            state.subCategories.push(action.payload);
        },
        updateSubCategory(state, action) {
            // action.payload is the updated sub-category object
            state.subCategories = state.subCategories.map(subCat =>
                subCat._id === action.payload._id ? action.payload : subCat
            );
        },
        removeSubCategory(state, action) {
            // action.payload is the id of the deleted sub-category
            state.subCategories = state.subCategories.filter(subCat => subCat._id !== action.payload);
        },
    }
})

export const {
    setSubCategories,
    setLoading,
    addSubCategory,
    updateSubCategory,
    removeSubCategory
} = subCategorySlice.actions;
export default subCategorySlice.reducer;
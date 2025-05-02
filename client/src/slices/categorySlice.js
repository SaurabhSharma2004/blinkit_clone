import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    loading: false,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        setCategories(state, action) {
            state.categories = [...action.payload];
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        addCategory(state, action) {
            // action.payload is the new category object
            state.categories.push(action.payload);
        },
        updateCategory(state, action) {
            // action.payload is the updated category object
            state.categories = state.categories.map(cat =>
                cat._id === action.payload._id ? action.payload : cat
            );
        },
        removeCategory(state, action) {
            // action.payload is the id of the deleted category
            state.categories = state.categories.filter(cat => cat._id !== action.payload);
        },
    },
});

export const {
    setCategories,
    setLoading,
    addCategory,
    updateCategory,
    removeCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
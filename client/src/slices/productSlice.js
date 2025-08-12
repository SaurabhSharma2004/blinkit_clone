import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    products: [],
    loading: false,
};

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setProducts(state, action) {
            state.products = [...action.payload];
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        addProduct(state, action) {
            state.products.push(action.payload)
        },
        updateProduct(state, action) {
            state.products = state.products.map(prod =>
            prod._id === action.payload._id ? action.payload : prod)
        },
        removeProduct(state, action) {
            state.products = state.products.filter(prod => prod._id !== action.payload)
        },
    }
})

export const {
    setProducts,
    setLoading,
    addProduct,
    updateProduct,
    removeProduct
} = productSlice.actions;

export default productSlice.reducer;
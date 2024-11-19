import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Thunk to increment quantity
export const incrementQuantityCart = createAsyncThunk(
    'cart/incrementQuantity',
    async (productId, { getState }) => {
        const { getCart } = getState();
        const item = getCart.CartsData.find(item => item.productId === productId);
        if (item) {
            const newQuantity = item.quantity + 1;
            const { data } = await axios.put(
                `http://localhost:5000/api/cart/update/${productId}`,
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } }
            );
            return { ...data, productId }; // Pass productId to know which item was updated
        }
    }
);

// Thunk to decrement quantity
export const decrementQuantityCart = createAsyncThunk(
    'cart/incrementQuantity',
    async (productId, { getState }) => {
        const { getCart } = getState();
        const item = getCart.CartsData.find(item => item.productId === productId);
        if (item && item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            const { data } = await axios.put(
                `http://localhost:5000/api/cart/update/${productId}`,
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } }
            );
            return { ...data, productId };
        }
        return Promise.reject("Quantity cannot be less than 1");
    }
);

const initialState = {
    CartsData: [],
    isLoading: false,
    error: null,
};

const incrementcartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle increment quantity
            .addCase(incrementQuantityCart.fulfilled, (state, action) => {
                const { productId } = action.payload;
                const item = state.CartsData.find(item => item.productId === productId);
                if (item) item.quantity += 1;
                state.isLoading = false;
            })
            .addCase(incrementQuantityCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(incrementQuantityCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
     
    },
});

export const incrementcartReducer = incrementcartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const UpdateQuantityCart = createAsyncThunk(
    'UpdateQuantityCart/put',
    async ({ productId, quantity }) => {
        const { data } = await axios.put(`http://localhost:5000/api/cart/update/${productId}`,
            {quantity},
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                }
            });
        console.log(data);
        return data;
    }
);



const initialState = {
    id: null,
    CartsDataUpdated: [],
    isLoading: false,
    error: null,
};

const updateCartQuantity = createSlice({
    name: 'cartupdate',
    initialState,
    reducers: {
        getId: (state, action) => {
            state.id = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(UpdateQuantityCart.fulfilled, (state, action) => {
                state.id = null
                state.isLoading = false;
                state.CartsDataUpdated = action.payload
            })
            .addCase(UpdateQuantityCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateQuantityCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const updateCartQuantityReducer = updateCartQuantity.reducer;
export const { } = updateCartQuantity.actions;

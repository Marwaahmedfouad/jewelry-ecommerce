import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const DeleteCartitem = createAsyncThunk(
    'deleteProduct',
    async (id) => {
        //1
        const { data } = await axios.delete(`http://localhost:5000/api/cart/remove/${id}`,{headers:{
            Authorization:  `Bearer ${sessionStorage.getItem("userToken")}`
          }})
        console.log(data);
        return data
    }
)
const initialState = {
    //2
    id: null,
    CartsData: [],
    isloading: 'false',
    error: null,
}
const DeleteCartProducts = createSlice({
    name: 'products',
    initialState,
    reducers: { 
        //3
        getProductId:(state,action)=>{
            state.id=action.payload
            console.log("Item ID set to:", action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteCartitem.fulfilled, (state, action) => {
                state.isloading = false;
                //4 Optionally reset the ID after deletion
                state.id = null; 
            })
            .addCase(DeleteCartitem.pending, (state) => {
                state.isloading = true;
            })
            .addCase(DeleteCartitem.rejected, (state, action) => {
                state.isloading = false;
                state.error = action.error.message

            })

    }
})

export const DeleteCartProductsReducer = DeleteCartProducts.reducer;

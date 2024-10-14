import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchProducts=createAsyncThunk('fetchProducts',
   async ()=>{const {data}= await axios.get('http://localhost:5000/api/products')
    console.log(data);
    return data
   }
    )
const initialState={
    products:[],
    isloading:'false',
    error:null
}
const ProductData =createSlice({
    name:'products',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.isloading=false;
            state.products=action.payload;
        })
        .addCase(fetchProducts.pending,(state,action)=>
        {
            state.isloading=true;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.isloading=false;
            state.error=action.error.message

        })

    }
})

export const ProductDataReducer=ProductData.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchCartProducts = createAsyncThunk(
  'fetchProducts',
  async () => {
    const { data } = await axios.get('http://localhost:5000/api/cart', {headers:{
      Authorization:  `Bearer ${sessionStorage.getItem("userToken")}`
    }})
    console.log(data);
    return data
  }
)

const initialState = {
  CartsData: [],
  isloading: 'false',
  error: null,
  totalQuantity: 0,
}
const CartProducts = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  //   getQuantity:(state)=>{
  //    state.totalQuantity=state.CartsData.reduce((acc,item)=>acc+ item.quantity,0)
  //     console.log(totalQuantity);
  //   }
   },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.isloading = false;
        state.CartsData = action.payload;
        //it better make it in fullfilled(Documentaion)
        // state.totalQuantity=action.payload.reduce((acc,item)=>acc+ item.quantity,0)
        //or
        state.totalQuantity=state.CartsData.reduce((acc,item)=>acc+ item.quantity,0)
        
      })
      .addCase(fetchCartProducts.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message

      })

  }
})

export const CartProductsReducer = CartProducts.reducer;
export const {getQuantity,incrementQuantity,decrementQuantity}=CartProducts.actions

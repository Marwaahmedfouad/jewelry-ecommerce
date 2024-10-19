import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartArray: [],
};
const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    addToCart(state, action) {
      const exsitingProduct=state.cartArray.find((p)=>p.id === action.payload.id);
      if (exsitingProduct) {
        exsitingProduct.quantity += 1;
      }else{
        state.cartArray.push({...action.payload,quantity:1})
      }
        console.log(action.payload);
        console.log("Updated cartArray in reducer:", state.cartArray);
        
    },
    deleteFromCart(state, action) {
      state.cartArray= state.cartArray.filter((p)=>p.id !== action.payload.id);
      console.log(state.cartArray);

    },
  },
});

export const cartSliceReducer = cartSlice.reducer;
export const { addToCart, deleteFromCart } = cartSlice.actions;

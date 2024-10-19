import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './authenticatinoSlice';
import { ProductDataReducer } from './ProductsSlice';
import { cartSliceReducer } from './cartSlice';



export const store=configureStore({
    reducer:{
        authProjext:authSliceReducer,
        ProductsRedux:ProductDataReducer,
        carts:cartSliceReducer
    }
})




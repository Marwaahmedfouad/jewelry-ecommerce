import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './authenticatinoSlice';
import { ProductDataReducer } from './ProductsSlice';



export const store=configureStore({
    reducer:{
        authProjext:authSliceReducer,
        ProductsRedux:ProductDataReducer
    }
})




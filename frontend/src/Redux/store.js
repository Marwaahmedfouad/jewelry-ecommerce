import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './authenticatinoSlice';



export const store=configureStore({
    reducer:{
        authProjext:authSliceReducer
    }
})




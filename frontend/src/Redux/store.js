import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './authenticatinoSlice';
import { ProductDataReducer } from './ProductsSlice';
import { AddToCartReducer } from './AddToCartSlice';
import { CartProductsReducer } from './GetCartSlice';
import { DeleteCartProductsReducer } from './DeleteCartSlice';
import { updateCartQuantityReducer } from './UpdateQuantityCart';
import { decrementcartReducer } from './decrementQuantityCart';
import { incrementcartReducer } from './incrementQuantityCart';



export const store=configureStore({
    reducer:{
        authProjext:authSliceReducer,
        ProductsRedux:ProductDataReducer,
        AddCart:AddToCartReducer,
        getCart:CartProductsReducer,
        deleteCart:DeleteCartProductsReducer,
        updateCartQuantity:updateCartQuantityReducer,
        decrement:decrementcartReducer,
        increment:incrementcartReducer
    
    }
})





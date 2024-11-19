// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import axios from 'axios'


// // export const addToProducts=createAsyncThunk('add/producttocart',
// //    async ()=>{const {data}= await axios.POST('http://localhost:5000/api/cart/add',{ "productId": 1, "quantity": 2 },{Headers:{}})
// //     console.log(data);
// //     return data
// //    }
// //     )


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

// // Async thunk for adding an item to the cart
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, quantity }, { getState, rejectWithValue }) => {
//     try {
//       // Get the JWT token from the auth state
//       const token = getState().authProjext.userData;

//       // Make the API request with the Authorization header
//       const response = await axios.post(
//         "http://localhost:5000/api/cart/add",
//         { productId, quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return response.data; // Return the cart data received from the API
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // const initialState={
// //     cart:[],
// //     isloading:'false',
// //     error:null
// // }
// // const AddToCart =createSlice({
// //     name:'products',
// //     initialState,
// //     reducers:{

// //     },
// //     extraReducers:(builder)=>{
// //         builder
// //         .addCase(addToCart.fulfilled,(state,action)=>{
// //             state.isloading=false;
// //             state.cart=action.payload;
// //         })
// //         .addCase(addToCart.pending,(state,action)=>
// //         {
// //             state.isloading=true;
// //         })
// //         .addCase(addToCart.rejected,(state,action)=>{
// //             state.isloading=false;
// //             state.error=action.error.message

// //         })

// //     }
// // })

// // export const AddToCartReducer=AddToCart.reducer
// const initialState = {
//     cart: [],
//     isLoading: false,
//     error: null,
//   };
  
//   const AddToCartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(addToCart.pending, (state) => {
//           state.isLoading = true;
//           state.error = null;
//         })
//         .addCase(addToCart.fulfilled, (state, action) => {
//           state.isLoading = false;
//           // Add the new item(s) to the cart array
//           state.cart.push(action.payload);
//         })
//         .addCase(addToCart.rejected, (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload; // Capture the error message
//         });
//     },
//   });
  
//   export const AddToCartReducer = AddToCartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to handle adding item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:5000/api/cart/add",
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      }
    );
      console.log('hello');
    return response.data;
  // console.log(sessionStorage.getItem("userToken"));
   //console.log(response);

  // console.log(quantity);
  // console.log(productId);
  
   
   
   
  }
);

const addToCartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload); // Add the item to the cart state
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const AddToCartReducer = addToCartSlice.reducer; 

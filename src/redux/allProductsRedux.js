import {createSlice} from '@reduxjs/toolkit'

const allProductsSlice = createSlice({
   name:'products',
   initialState: {
      allProducts: []
   },
   reducers: {
      getAllProducts: (state, action) => {
         state.allProducts = action.payload
      }
   }
})



export const {getAllProducts} = allProductsSlice.actions
export default allProductsSlice.reducer
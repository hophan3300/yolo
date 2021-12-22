import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
   name:'user',
   initialState: {
      currentUser: null,
      error: false,
      isFetching:false,
   },
   reducers: {
      loginStart: (state) => {
         state.isFetching = true
      },
      loginSuccess: (state, action) => {
         state.isFetching = false
         state.currentUser = action.payload
         state.error = false
      },
      loginFail: (state) => {
         state.isFetching = false
         state.error = true
      },
      logout: (state) => {
         state.isFetching = false
         state.currentUser = null
      },
      registerStart : (state) => {
         state.isFetching = true
      },
      registerSuccess: (state, action) => {
         state.isFetching = false
         state.currentUser = action.payload
         state.error = false
      },
      registerFail: (state) => {
         state.isFetching =false
         state.error = true
      }
   }
})



export const {loginSuccess, loginFail, loginStart, logout, registerFail, registerStart, registerSuccess} = userSlice.actions
export default userSlice.reducer
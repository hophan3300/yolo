import {loginStart, loginSuccess, loginFail, logout, registerFail, registerStart, registerSuccess} from './userRedux'
import {getAllProducts} from './allProductsRedux'

import {publicReq} from '../services/api'


export const login = async (dispatch, user) => {
   dispatch(loginStart())
   try {
      const res = await publicReq.post("/auth/login", user)
      dispatch(loginSuccess(res.data))
   } catch{
      dispatch(loginFail())
   }
}

export const logouted = async (dispatch) => {
   dispatch(logout())
}

export const register = async (dispatch, user) => {
   dispatch(registerStart())
   try {
      const res = await publicReq.post("/auth/register", user)
      dispatch(registerSuccess(res.data))
   } catch {
      dispatch(registerFail())
   }
}

export const allProducts = async (dispatch) => {
   const res = await publicReq.get(`/products`)
   dispatch(getAllProducts(res.data))
}
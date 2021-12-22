import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
   name:'cart',
   initialState: {
      products: [],
      quantity: 0,
      total: 0
   },
   reducers: {
      addProduct: (state, action) => {
         const newItem = action.payload
         const itemFinded = findItem(state.products, newItem)
         if(itemFinded) {
            state.products = deleteItem(state.products, itemFinded)
            state.products = [...state.products,{
               ...itemFinded,
               quantity: itemFinded.quantity + newItem.quantity
            }]
            state.total += newItem.quantity * newItem.price
         }else{
            state.products = [...state.products,{
               ...newItem,
               key: state.quantity > 0 ? state.quantity + 1 : 1
            }]
            state.quantity += 1
            state.total += newItem.quantity * newItem.price
         }
         sortItem(state.products)
         
      },
      updateProduct: (state, action) => {
         const newItem = action.payload
         const itemUpdate = findItem(state.products, newItem)
         if(itemUpdate) {
            state.products = deleteItem(state.products,itemUpdate)
            state.products = [...state.products,{
               ...itemUpdate,
               quantity: newItem.quantity,
            }]
            state.total += newItem.price * (newItem.quantity - itemUpdate.quantity)
         }
         sortItem(state.products)
      },
      removeProduct: (state, action) => {
         const newItem = action.payload
         state.products = deleteItem(state.products, newItem)
         state.quantity -= 1
         state.total -= newItem.quantity * newItem.price
         sortItem(state.products)
      }
   }
})


const findItem = (arr, item) => arr.find(i => i.slug === item.slug && i.colors === item.colors && i.size === item.size)

const deleteItem = (arr, item) => arr.filter(i => i.slug !== item.slug || i.colors !== item.colors || i.size !== item.size)

const sortItem = (arr) => arr.sort((a,b) => a.key - b.key)

export const {addProduct, updateProduct, removeProduct} = cartSlice.actions
export default cartSlice.reducer
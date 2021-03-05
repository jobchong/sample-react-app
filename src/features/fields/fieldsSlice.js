import { createSlice } from '@reduxjs/toolkit';
import product from './product';

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState: {
    user: {
      name: '',
      selectedProducts: [],
      previousTransactions: [],
    },
    products: product,
  },
  reducers: {
    setUser: (state, action) => {
      // external user api called here
      // e.g. fetch(/api/users/auth).then(updateReduxState(response))
      state.user.name = action.payload
    },
    addToProducts: (state, action) => {
      state.user.selectedProducts.push(action.payload)
    },
    removeFromProducts: (state, action) => {
      let toreturn = state.user.selectedProducts.filter(a => a.modelId != action.payload)
      state.user.selectedProducts = toreturn
    },
    addToTransactions: (state, action) => {
      // if there was a payment solution, call to external api should be here
      // e.g. fetch(https://api.stripe.com/...).then(updateReduxState(response))
      state.user.previousTransactions = state.user.previousTransactions.concat(action.payload)
      state.user.selectedProducts = []
    },
  },
})

export const { setUser, addToProducts, removeFromProducts, addToTransactions } = fieldsSlice.actions;


export const selectName = state => state.fields.user.name
export const selectAllProduct = state => state.fields.products
export const selectProduct = state => state.fields.user.selectedProducts
export const selectTransactions = state => state.fields.user.previousTransactions

export default fieldsSlice.reducer

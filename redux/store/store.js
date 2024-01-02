import { configureStore } from '@reduxjs/toolkit'
import productSlice from '../slice/productSlice'

export const store = configureStore({
    reducer: {
        cart: productSlice
    }
})
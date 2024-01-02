import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';



const initialState = {
    cart: []
}

const productSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        //add to cart
        addToCart: (state, action) => {
            const isCart = state.cart.find(item => item._id === action.payload._id)

            if (isCart) {
                isCart.newQty++;
                toast.success('Product quantity update')
            } else {
                state.cart.push({ ...action.payload, newQty: 1 });
                toast.success('Product add success')

            }
        },

        incrementQtyInput: (state, action) => {
            const index = state.cart.findIndex((item) => item._id === action.payload._id);
            state.cart[index].newQty = action.payload.quantity
        },


        //remove product from cart 
        removeFromCart: (state, action) => {
            const removePd = state.cart.filter(item => item._id !== action.payload)
            state.cart = removePd
            toast.success('Product remove success')
        }
    }
})

export const { addToCart, removeFromCart, incrementQtyInput } = productSlice.actions;

export default productSlice.reducer;
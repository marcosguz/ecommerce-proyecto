import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload
            return cart
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then((response) => dispatch(setCart(response.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addCartThunk = (carts) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', carts, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.log(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const buyCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

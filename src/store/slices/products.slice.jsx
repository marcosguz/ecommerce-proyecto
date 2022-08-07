import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
setProducts : (state, action) => {
    const products = action.payload; 
    return products;
}
    }
})
export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const filterTitleThunk = searchValue => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
    .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${searchValue}`)
    .then(res => dispatch(setProducts(res.data.data.products))) // setProducts(res.data)
    .finally(() => dispatch(setIsLoading(false)));
};
export const filterCategoryThunk = (categorieId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${categorieId}`)
        .then(response => dispatch(setProducts(response.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

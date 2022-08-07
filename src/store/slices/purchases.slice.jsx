import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig'

export const purchsesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            const purchases = action.payload
            return purchases
        }
    }
})

export const purchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
        .then(response => dispatch(setPurchases(response.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setPurchases } = purchsesSlice.actions;

export default purchsesSlice.reducer;

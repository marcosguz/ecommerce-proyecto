import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { purchasesThunk } from '../store/slices/purchases.slice'

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.pruchases)

    useEffect(() => {
        dispatch(purchasesThunk())
    }, [])

    
    return (
        <div>
            <h1>Purchases</h1>
            <ul>
                {
                    purchases.map(purchase => (
                        <li key={purchase.id}>
                            {purchase.cart.status}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;
import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice';
import CartSlice from './CartSlice';

const rootReducer = {
    product: ProductSlice,
    cart: CartSlice,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;

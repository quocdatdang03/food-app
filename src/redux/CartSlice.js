import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        listCart: [],
        totalQuantity: 0,
        totalPrice: 0,
        quantityProduct: 1,
    },

    reducers: {
        addToCart: (state, action) => {
            const existIndex = state.listCart.findIndex((item) => item.id === action.payload.id);
            if (existIndex >= 0) {
                state.listCart[existIndex].quantity += state.quantityProduct;
            } else {
                state.listCart = [...state.listCart, { ...action.payload, quantity: state.quantityProduct }];
            }
        },

        increaseProduct: (state, action) => {
            const existIndex = state.listCart.findIndex((item) => item.id === action.payload.id);
            // vì khi addToCart đã có quantity trong đó nên ta . được đến key quantity ở đây
            state.listCart[existIndex].quantity += 1;
        },

        decreaseProduct: (state, action) => {
            const existIndex = state.listCart.findIndex((item) => item.id === action.payload.id);
            if (state.listCart[existIndex].quantity === 1) {
                state.listCart = state.listCart.filter((item) => item.id !== action.payload.id);
            } else {
                state.listCart[existIndex].quantity -= 1;
            }
        },
        deleteFromCart: (state, action) => {
            state.listCart = state.listCart.filter((item) => item.id !== action.payload.id);
        },
        inCrease: (state) => {
            state.quantityProduct += 1;
        },
        deCrease: (state) => {
            if (state.quantityProduct === 1) {
                state.quantityProduct = 1;
            } else {
                state.quantityProduct -= 1;
            }
        },
        resetQuantity: (state) => {
            state.quantityProduct = 1;
        },
        getTotal: (state) => {
            let { totalPrice, totalQuantity } = state.listCart.reduce(
                (totalCurrent, currentProduct) => {
                    const { price, quantity } = currentProduct;
                    const totalProduct = price * quantity;
                    totalCurrent.totalPrice += totalProduct;
                    totalCurrent.totalQuantity += quantity;
                    return totalCurrent;
                },
                { totalPrice: 0, totalQuantity: 0 },
            );
            state.totalPrice = totalPrice.toFixed(2);
            state.totalQuantity = totalQuantity;
        },
    },
});

export const {
    addToCart,
    increaseProduct,
    decreaseProduct,
    deleteFromCart,
    getTotal,
    inCrease,
    deCrease,
    resetQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

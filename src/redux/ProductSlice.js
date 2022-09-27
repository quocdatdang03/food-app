import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
    name: 'product',
    initialState: {
        viewLayoutProduct: 'grid',
        pathProduct: 'best-foods',
        priceFilter: '',
        rateFilter: null,
        inputSearchValue: '',
    },

    reducers: {
        setViewlayoutProduct: (state, action) => {
            const viewProduct = action.payload;
            state.viewLayoutProduct = viewProduct;
        },
        setpathProduct: (state, action) => {
            const pathProduct = action.payload;
            state.pathProduct = pathProduct;
        },
        FilterPrice: (state, action) => {
            const priceCurrent = action.payload;
            state.priceFilter = priceCurrent;
        },
        FilterRate: (state, action) => {
            const rateCurrent = action.payload;
            state.rateFilter = rateCurrent;
        },
        setInputSearchValue: (state, action) => {
            const inputValue = action.payload;
            state.inputSearchValue = inputValue;
        },
    },
});

export const { setViewlayoutProduct, setpathProduct, FilterPrice, FilterRate, setInputSearchValue } =
    productSlice.actions;
export default productSlice.reducer;

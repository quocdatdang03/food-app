import { createSlice } from '@reduxjs/toolkit';
const pathFilterFromLocalStorage = JSON.parse(localStorage.getItem('pathProduct'));
const productSlice = createSlice({
    name: 'product',
    initialState: {
        viewLayoutProduct: 'grid',
        pathProduct: pathFilterFromLocalStorage || 'best-foods',
        priceFilter: '',
        rateFilter: null,
        inputSearchValue: '',
        activeInfoProduct: 'description',
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
        setActiveInfoProduct: (state, action) => {
            const infoProduct = action.payload;
            state.activeInfoProduct = infoProduct;
        },
    },
});

export const {
    setViewlayoutProduct,
    setpathProduct,
    FilterPrice,
    FilterRate,
    setInputSearchValue,
    setActiveInfoProduct,
} = productSlice.actions;
export default productSlice.reducer;

import { useEffect, useState } from 'react';

import { Context } from './Context';

function Provider({ children }) {
    const [showCart, setShowCart] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [filterProductData, setFilterProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showBtnScrollTop, setShowBtnScrollTop] = useState(false);

    useEffect(() => {
        const scrollButtonToTop = () => {
            if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
                setShowBtnScrollTop(true);
            } else {
                setShowBtnScrollTop(false);
            }
        };

        window.addEventListener('scroll', scrollButtonToTop);

        // clean up function :
        return () => window.removeEventListener('scroll', scrollButtonToTop);
    }, [showBtnScrollTop]);
    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                showNav,
                setShowNav,
                filterProductData,
                setFilterProductData,
                loading,
                setLoading,
                foodData,
                setFoodData,
                showModal,
                setShowModal,
                showBtnScrollTop,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default Provider;

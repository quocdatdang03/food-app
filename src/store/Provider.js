import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Context from './Context';
import { auth } from '../firebase/config';

function Provider({ children }) {
    const [showCart, setShowCart] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [filterProductData, setFilterProductData] = useState([]);

    // Xử lý login / signIn :
    const navigate = useNavigate();
    // const location = useLocation();
    const { pathname } = useLocation();
    const pathNameSignIn = '/signin';
    console.log(pathname);
    // dùng location.pathname hoặd lấy pathname ra bằng destructuring : const { pathname } = useLocation();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unSubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, photoURL } = user;
                setUser({ displayName, email, photoURL });

                // Nếu đường dẫn hiện tại là /signin thì chuyển hướng đến trang home'
                if (pathname.includes(pathNameSignIn)) {
                    navigate('/');
                }
            }
        });
        // clean up function :
        return () => unSubscribed;
    }, []);
    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                showNav,
                setShowNav,
                filterProductData,
                setFilterProductData,
                foodData,
                setFoodData,
                showModal,
                setShowModal,
                user,
                setUser,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default Provider;

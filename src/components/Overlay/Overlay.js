import { useContext } from 'react';

import Context from '../../store/Context';

function OverLay() {
    const { setShowCart, setShowNav, setShowModal, showNav, showCart, showModal, user } = useContext(Context);

    // handle remove box cart :
    const handleRemoveBoxCart = () => {
        setShowCart(false);
        setShowNav(false);
        setShowModal(false);
    };
    return (
        <div
            className={`fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.65)] ease-in-out duration-300 ${
                showNav || showCart || showModal ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={handleRemoveBoxCart}
        ></div>
    );
}

export default OverLay;

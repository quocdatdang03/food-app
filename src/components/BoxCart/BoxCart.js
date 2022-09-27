import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { MdDeleteOutline } from 'react-icons/md';
import { RiSubtractLine } from 'react-icons/ri';
import { AiOutlinePlus, AiOutlineShoppingCart } from 'react-icons/ai';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import images from '../../assets/images/images';
import Context from '../../store/Context';
import { addToCart, deleteFromCart, removeFromCart } from '../../redux/CartSlice';

function BoxCart() {
    const listCart = useSelector((state) => state.cart.listCart);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();
    const { showCart, setShowCart } = useContext(Context);
    // handle remove box cart :
    const handleRemoveBoxCart = () => {
        setShowCart(false);
    };

    // handle add to cart :
    const handleAddToCart = (currentProduct) => {
        const action = addToCart(currentProduct);
        dispatch(action);
    };
    // handle remove from cart :
    const handleremoveFromCart = (currentItem) => {
        const action = removeFromCart(currentItem);
        dispatch(action);
    };
    // handle delete from cart :
    const handleDeleteFromCart = (currentItem) => {
        const action = deleteFromCart(currentItem);
        dispatch(action);
    };

    return (
        <div
            className={`fixed top-0 bottom-0 right-0 w-full md:w-[450px] bg-white z-10 ${
                showCart ? 'translate-x-[0]' : 'translate-x-[100%]'
            } ease-linear duration-300`}
        >
            <div className="flex items-center justify-between p-[12.8px] border-y border-[#e0e0e0]">
                <h1 className="uppercase text-[26px] font-bold">Your cart</h1>
                <button onClick={handleRemoveBoxCart}>
                    <FontAwesomeIcon icon={faClose} className="text-[30px] text-primary" />
                </button>
            </div>
            {listCart.length === 0 ? (
                <>
                    <div className="flex flex-col items-center">
                        <img src={images.emptyCart} alt="empty-cart" className="w-[320px] h-[320px] object-cover" />
                        <p className="text-[#4c4c4c] text-[20px] font-medium">Your Cart Is Empty</p>
                        <NavLink
                            to="/order"
                            className="text-white bg-primary text-[16px] uppercase font-medium mt-[16px] w-[200px] py-[6px] px-[16px] rounded-[4px] text-center shadow-btn"
                            onClick={() => setShowCart(false)}
                        >
                            Buy now
                        </NavLink>
                    </div>
                </>
            ) : (
                <div className="py-[20px] px-[15px]">
                    {listCart.map((item) => {
                        return (
                            <div className="flex items-center justify-between text-[14px] mb-[15px]" key={item.id}>
                                <div className="flex item-center">
                                    <img
                                        className="w-[75px] h-[75px] object-cover mr-[15px]"
                                        src={item.img}
                                        alt={item.name}
                                    />
                                    <div className="flex flex-col items-start">
                                        <h2 className="font-semibold">{item.name}</h2>
                                        <p className="my-[9px] text-primary font-bold">${item.price}</p>
                                        <div className="flex items-center">
                                            <button className="btn-cart" onClick={() => handleremoveFromCart(item)}>
                                                <RiSubtractLine />
                                            </button>
                                            <span className="px-[10px]">{item.quantity}</span>
                                            <button className="btn-cart" onClick={() => handleAddToCart(item)}>
                                                <AiOutlinePlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="text-[23px] text-[rgba(0,0,0,0.87)] w-[39px] h-[35px] rounded-[4px] bg-transparent hover:bg-[#f5f5f5] flex items-center justify-center ease-in duration-200"
                                    onClick={() => handleDeleteFromCart(item)}
                                >
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-white shadow-boxCheckout px-[25px] pb-[25px]">
                <div className="flex items-center justify-between px-[10px] mb-[10px]">
                    <h1 className="text-[18px]">Total</h1>
                    <p className="font-bold text-primary text-[22px]">${totalPrice}</p>
                </div>
                <div className="flex items-center">
                    <NavLink
                        to="/checkout"
                        className="bg-primary text-white btn-cart-bottom hover-btn-primary mr-[20px]"
                        onClick={() => setShowCart(false)}
                    >
                        <AiOutlineShoppingCart className="pr-[5px] text-[16px]" />
                        checkout
                    </NavLink>
                    <NavLink
                        to="/order"
                        className="bg-white hover:bg-[rgba(0,0,0,0.04)] text-[#474747] btn-cart-bottom mr-0"
                        onClick={() => setShowCart(false)}
                    >
                        <SiHomeassistantcommunitystore className="pr-[5px] text-[16px]" />
                        buymore
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default BoxCart;

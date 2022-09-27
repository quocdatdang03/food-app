import { faBars, faCartShopping, faClose, faHome, faKitchenSet, faMessage } from '@fortawesome/free-solid-svg-icons';
import { VscSignOut } from 'react-icons/vsc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import images from '../../../assets/images/images';
import Nav from '../../../components/Nav';
import NavMobile from '../../../components/NavMobile';
import BoxCart from '../../../components/BoxCart/BoxCart';
import OverLay from '../../../components/Overlay/Overlay';
import Context from '../../../store/Context';
import { getTotal } from '../../../redux/CartSlice';
import { auth } from '../../../firebase/config';
import ModalLogin from '../../../components/ModalLogin';

const navData = [
    {
        title: 'Home',
        icon: faHome,
        to: '/',
    },
    {
        title: 'Order online',
        icon: faKitchenSet,
        to: '/order',
    },
    {
        title: 'Previews',
        icon: faMessage,
        to: '/previews',
    },
];
function Header() {
    const navigate = useNavigate();
    const { user, setUser, showModal, setShowModal } = useContext(Context);
    const dispatch = useDispatch();
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const [headerActive, setHeaderActive] = useState();
    const { showCart, setShowCart, showNav, setShowNav } = useContext(Context);
    // handle header when scroll :
    useEffect(() => {
        const scrollHeader = () => {
            if (document.body.scrollTop > 72 || document.documentElement.scrollTop > 72) {
                setHeaderActive(true);
            } else {
                setHeaderActive(false);
            }
        };
        window.addEventListener('scroll', scrollHeader);

        // cleanup function :
        return () => {
            window.removeEventListener('scroll', scrollHeader);
        };
    }, []);

    // handle show box cart :
    const handleShowBoxCart = () => {
        user ? setShowCart(true) : setShowModal(true);
    };

    // handle show nav mobile and tablet :
    const handleShowNav = () => {
        setShowNav(true);
    };

    // handleRemoveNav
    const handleRemoveNav = () => {
        setShowNav(false);
        console.log(100);
    };

    //  handle get totalQuantity :
    const listCart = useSelector((state) => state.cart.listCart);
    useEffect(() => {
        dispatch(getTotal());
    }, [listCart]);

    // Lấy ra các thông tin tài khoản đã đăng nhập :
    const { displayName, email, photoURL } = user || '';

    // handle sign out :
    const handleSignOut = () => {
        auth.signOut().then(() => {
            setUser(false);
        });
    };

    // handle to page sign in :
    const handleToSignin = () => {
        // Nếu mà có user (đã đăng nhập) thì không đến trang sign in , còn nếu chưa đăng nhập thì chuyển hướng đến trang sign in :
        !user && navigate('/signin');
    };
    return (
        <div
            className={`w-full flex justify-center fixed z-50 top-0 right-0 left-0 ${
                headerActive ? 'bg-[rgba(0,0,0,0.80)] mt-0' : 'bg-transparent mt-[5px]'
            } ease-out duration-200`}
        >
            {!user && <ModalLogin />}
            <div className="max-w-primary w-full h-[72px] px-[24px] flex items-center justify-between">
                <button className="block md:hidden">
                    <FontAwesomeIcon icon={faBars} className="text-[28px] text-white" onClick={handleShowNav} />
                </button>
                <div className="flex items-center">
                    <img className="w-[100px] h-[100px] object-cover mt-[26px]" src={images.logo} alt="logo" />
                    {navData.map((item, index) => {
                        return <Nav title={item.title} icon={item.icon} to={item.to} key={index} />;
                    })}
                </div>
                <div className="flex items-center">
                    <button className="relative md:mr-[40px] cursor-pointer inline-block" onClick={handleShowBoxCart}>
                        <FontAwesomeIcon icon={faCartShopping} className="text-[28px] text-white" />
                        <div className="absolute text-white bg-[#fbb403] text-[14px] font-bold rounded-[6px]  top-[14px] right-[-14px] w-[26px] h-[20px] flex items-center justify-center">
                            {user ? totalQuantity : 0}
                        </div>
                    </button>
                    <button
                        className="items-center text-white hover:text-[#ff514e] hidden md:flex relative group"
                        onClick={handleToSignin}
                    >
                        <img
                            src={user ? photoURL : images.noAvatar}
                            alt="no-avatar"
                            className="w-[40px] h-[40px] object-cover rounded-[50%]"
                        />
                        <p className="text-[15px] font-bold pl-[8px] ease-in duration-200">
                            {user ? displayName : 'SignIn'}
                        </p>
                        {user && (
                            <div className="absolute top-[150%] right-0 bg-white ease-linear duration-200 hover: flex flex-col w-[120px] py-[5px] rounded-md opacity-0 translate-y-[10px] invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
                                <button
                                    className="flex items-center justify-center bg-white hover:bg-[#ebebeb] ease-out duration-200 text-black py-[6px] px-[5px] text-[16px]"
                                    onClick={handleSignOut}
                                >
                                    <VscSignOut className="mr-[5px]" />
                                    <span>Log out</span>
                                </button>
                                {/* tam giac */}
                                <div className="absolute w-0 h-0 border-x-transparent border-t-transparent border-white border-[14px] top-[-22px] right-[7px]"></div>
                                {/* thanh bac cau */}
                                <div className="absolute w-full h-[30px] top-[-29px] bg-transparent"></div>
                            </div>
                        )}
                    </button>
                </div>
            </div>
            {<OverLay />}
            <BoxCart />

            {/* box nav on Mobile and Tablet */}
            <div
                className={`fixed top-0 bottom-0 left-0 w-[80%] bg-[#010101] transition-transform duration-500 ${
                    showNav ? 'translate-x-0' : 'translate-x-[-100%]'
                }`}
            >
                <div className="w-full flex items-center justify-end px-[16px] pt-[10px]">
                    <button>
                        <FontAwesomeIcon icon={faClose} className="text-white text-[25px]" onClick={handleRemoveNav} />
                    </button>
                </div>
                <div className="flex items-center justify-between p-[16px] border-b border-[#333333] mb-[10px]">
                    <button className="flex items-center text-white hover:text-[#ff514e]" onClick={handleToSignin}>
                        <img
                            src={user ? photoURL : images.noAvatar}
                            alt={user ? displayName : 'no-avatar'}
                            className="w-[35px] h-[35px] object-cover rounded-[50%]"
                        />
                        <p className="pl-[10px]">{user ? displayName : 'Sign In'}</p>
                    </button>
                    {user && (
                        <button className="text-white" onClick={handleSignOut}>
                            Log out
                        </button>
                    )}
                </div>
                <div className="">
                    {navData.map((item, index) => {
                        return <NavMobile title={item.title} icon={item.icon} to={item.to} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Header;

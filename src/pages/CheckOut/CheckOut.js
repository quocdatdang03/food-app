import { NavLink } from 'react-router-dom';
import { BsCardList, BsThreeDots } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import { AiFillLike } from 'react-icons/ai';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../store/Context';
import { auth } from '../../firebase/config';
import countriesList from '../../utils/countriesList';
import '../../sass/CheckOut.scss';
import images from '../../assets/images/images';
import CheckOutForm from './CheckOutForm';

function CheckOut() {
    const { user, setUser } = useContext(AuthContext);
    const { displayName, photoURL } = user;
    const navigate = useNavigate();

    const handleLogOut = () => {
        auth.signOut().then(() => setUser(false));
    };

    const handleToLogin = () => {
        navigate('/signin');
    };

    return (
        <div>
            <div className="bg-bgFood w-full h-[360px] bg-cover bg-no-repeat bg-fixed flex flex-col items-center justify-center">
                <h1 className="first-letter:uppercase text-[36px] text-white">Checkout</h1>
                <div className="flex items-center text-white text-[14px]">
                    <NavLink className="p-[7px] m-[3px] hover:text-primary ease-out duration-200" to="/">
                        Home
                    </NavLink>
                    <BsThreeDots />
                    <NavLink className="p-[7px] m-[3px] hover:text-primary ease-out duration-200" to="/order">
                        Shop
                    </NavLink>
                    <BsThreeDots />
                    <p className="p-[7px] m-[3px] text-primary ease-out duration-200">Checkout</p>
                </div>
            </div>
            <div className="max-w-primary m-auto grid grid-cols-2 mt-[70px] px-[75px]">
                {user ? (
                    <div className="col-span-1">
                        <div className="flex items-center justify-between mb-[50px]">
                            <div className="flex items-center flex-1">
                                <div className="flex flex-col items-center">
                                    <div className="w-[55px] h-[55px] rounded-[50%] bg-primary text-[23px] flex items-center justify-center text-white">
                                        <HiUsers />
                                    </div>
                                    <p>Login</p>
                                </div>
                                <span className="relative block bg-primary w-[110%] h-[10px] mt-[-22px] mx-[-5px] z-[-1]"></span>
                            </div>
                            <div className="flex items-center flex-1">
                                <div>
                                    <div className="w-[55px] h-[55px] rounded-[50%] bg-primary text-[23px] flex items-center justify-center text-white">
                                        <BsCardList />
                                    </div>
                                    <p>Confirm</p>
                                </div>
                                <span className="relative block bg-[#bfbfbf] w-[110%] h-[10px] mt-[-22px] mx-[-5px] z-[-1]"></span>
                            </div>
                            <div>
                                <div className="w-[55px] h-[55px] rounded-[50%] bg-[#bfbfbf] text-[23px] flex items-center justify-center text-white">
                                    <AiFillLike />
                                </div>
                                <p>Success</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-[28px] mb-[25px]">Contact infomation</h1>
                            <div className="flex items-center">
                                <img
                                    className="w-[40px] h-[40px] object-cover border border-[rgba(0,0,0,0.1)] rounded-[50%]"
                                    src={photoURL}
                                    alt={displayName}
                                />
                                <div className="ml-[10px]">
                                    <h2 className="font-bold text-[13px]">{displayName}</h2>
                                    <button
                                        onClick={handleLogOut}
                                        className="text-primary text-[13px] mt-[5px] font-medium"
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-[28px] mb-[25px]">Shipping Address</h1>
                            <CheckOutForm />
                        </div>
                    </div>
                ) : (
                    <div className="col-span-2 flex flex-col items-center my-[100px]">
                        <h2 className="text-[15px] md:text-[18px] text-[#fbb403] font-medium font-pangolin">
                            Join with us!
                        </h2>
                        <h1 className="text-[22px] md:text-[32px] mb-[30px] text-center">
                            You are not logged in. Please log in and try again!
                        </h1>
                        <button
                            className="btn-cart-bottom hover-btn-primary bg-primary text-white"
                            onClick={handleToLogin}
                        >
                            login now
                        </button>
                        <img className="max-h-[350px] mt-[65px]" src={images.checkoutError} alt="checkout-error" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckOut;

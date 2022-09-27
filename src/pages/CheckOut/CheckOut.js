import { NavLink } from 'react-router-dom';
import { BsCardList, BsThreeDots } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import { AiFillLike } from 'react-icons/ai';

function CheckOut() {
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
            <div className="max-w-primary m-auto grid grid-cols-2">
                <div className="col-span-1">
                    <div className="flex items-center justify-between">
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
                </div>
            </div>
        </div>
    );
}

export default CheckOut;

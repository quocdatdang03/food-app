import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import FoodProduct from '../../components/FoodProducts/FoodProducts';

function Order() {
    const pathProductFilter = useSelector((state) => state.product.pathProduct);

    return (
        <div className="shop-order">
            <div className="bg-bgFood w-full h-[360px] bg-cover bg-no-repeat bg-fixed flex flex-col items-center justify-center mb-[80px]">
                <h1 className="first-letter:uppercase text-[36px] text-white">Shop</h1>
                <div className="flex items-center text-white text-[14px]">
                    <NavLink className="p-[7px] m-[3px] hover:text-primary ease-out duration-200" to="/">
                        Home
                    </NavLink>
                    <BsThreeDots />
                    <NavLink className="p-[7px] m-[3px] hover:text-primary ease-out duration-200" to="/order">
                        Shop
                    </NavLink>
                    <BsThreeDots />
                    <p className="p-[7px] m-[3px] text-primary ease-out duration-200">{pathProductFilter}</p>
                </div>
            </div>
            <div className="max-w-primary m-auto">
                <FoodProduct />
            </div>
        </div>
    );
}

export default Order;

import { useEffect, useState, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { RiSubtractLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaCartArrowDown, FaTruckMoving } from 'react-icons/fa';
import { BsCalendarCheck, BsTags, BsThreeDots } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

import { request } from '../../utils/request';
import Star from '../../components/FoodProducts/Rate/Star/Star';
import { addToCart, inCrease, deCrease } from '../../redux/CartSlice';
import Context from '../../store/Context';

const detail = [
    {
        icon: <FaTruckMoving size={'22px'} className="text-primary mr-[8px]" />,
        title: 'Free global shipping on all orders',
    },
    {
        icon: <BsCalendarCheck size={'22px'} className="text-primary mr-[8px]" />,
        title: 'Free global shipping on all orders',
    },
    {
        icon: <BsTags size={'22px'} className="text-primary mr-[8px]" />,
        title: 'Free global shipping on all orders',
    },
];

function Product() {
    const { user, showModal, setShowModal } = useContext(Context);
    const [foodProduct, setFoodProduct] = useState({});
    const pathProductFilter = useSelector((state) => state.product.pathProduct);
    const cartRedux = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        const productApi = async () => {
            try {
                const res = await request.get(`${pathProductFilter}/${id}`);
                setFoodProduct(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        productApi();
    }, []);

    // handleIncreaseProduct :
    const handleInCreaseProduct = () => {
        const action = inCrease();
        dispatch(action);
    };
    // handleDecreaseProduct :
    const handleDecreaseProduct = () => {
        const action = deCrease();
        dispatch(action);
    };

    // handle add to cart :
    const handleAddToCart = () => {
        const action = addToCart(foodProduct);
        user && !showModal ? dispatch(action) : setShowModal(true);
    };

    return (
        <div className="">
            <div className="bg-bgFood w-full h-[360px] bg-cover bg-no-repeat bg-fixed flex flex-col items-center justify-center">
                <h1 className="first-letter:uppercase text-[36px] text-white">{pathProductFilter}</h1>
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
            <div className="max-w-primary m-auto py-[50px]">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="col-span-1 flex justify-center px-[24px]">
                        <img
                            className="w-full lg:w-[552px] md:h-[552px] object-cover"
                            src={foodProduct.img}
                            alt={foodProduct.name}
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="px-[24px] lg:px-0">
                            <h1 className="text-[25px] mt-[24px] mb-[15px]">{foodProduct.name}</h1>
                            <div className="flex items-center justify-start mb-[15px]">
                                {<Star data={foodProduct.rate} inProduct />}
                                <span className="ml-[10px] text-[14px]">Customer reviewes</span>
                            </div>
                            <p className="font-bold text-[25px] text-primary mb-[20px]">
                                ${(foodProduct.price * cartRedux.quantityProduct).toFixed(2)}
                            </p>
                            <p className="text-[14px] text-[#999999] mb-[20px]">
                                Country: <span className="text-[#000000]">{foodProduct.country}</span>
                            </p>
                            <p className="text-[14px] mb-[20px]">{foodProduct.dsc}</p>
                            <div className="flex items-center flex-wrap mb-[20px] border-y">
                                <div className="flex items-center">
                                    <button
                                        className="w-[35px] h-[35px] bg-[rgba(0,0,0,.05)] hover:bg-[#f7f7f7] rounded-[50%] flex items-center justify-center hover:text-primary"
                                        onClick={handleDecreaseProduct}
                                    >
                                        <RiSubtractLine />
                                    </button>
                                    <span className="px-[15px]">{cartRedux.quantityProduct}</span>
                                    <button
                                        className="w-[35px] h-[35px] bg-[rgba(0,0,0,.05)] hover:bg-[#f7f7f7] rounded-[50%] flex items-center justify-center hover:text-primary"
                                        onClick={handleInCreaseProduct}
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                                <button
                                    className="uppercase text-[12px] flex items-center justify-center w-[300px] px-[8px] py-[6px] rounded-[999px] text-white bg-primary font-semibold my-[25px] mx-[20px]"
                                    onClick={handleAddToCart}
                                >
                                    <FaCartArrowDown className="pr-[5px]" size={'20px'} />
                                    Add to cart
                                </button>
                            </div>
                            {detail.map((item, index) => {
                                return (
                                    <p
                                        className="mb-[20px] border-l-4 border-primary flex items-center text-[14px] px-[7px] py-[4px]"
                                        key={index}
                                    >
                                        {item.icon} {item.title}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;

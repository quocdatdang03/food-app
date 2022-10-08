import { useEffect, useState, useContext, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { RiSubtractLine } from 'react-icons/ri';
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai';
import { FaCartArrowDown, FaTruckMoving } from 'react-icons/fa';
import { BsCalendarCheck, BsTags, BsThreeDots } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
// react-loading-skeleton
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { request } from '../../utils/request';
import Star from '../../components/FoodProducts/Rate/Star/Star';
import { addToCart, inCrease, deCrease } from '../../redux/CartSlice';
import { AuthContext, Context } from '../../store/Context';
import ToastMessage from '../../components/ToastMessage';
import { setActiveInfoProduct } from '../../redux/ProductSlice';
import images from '../../assets/images/images';
// Phần làm comment :
import UserComment from '../../components/UserComment/UserComment';
import addDocument from '../../firebase/service';
import useFirestore from '../../hooks/useFirestore';

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
    const [inputValue, setInputValue] = useState('');
    const { showModal, setShowModal } = useContext(Context);
    const { user } = useContext(AuthContext);
    const [foodProduct, setFoodProduct] = useState({});
    const pathProductFilter = useSelector((state) => state.product.pathProduct);
    const cartRedux = useSelector((state) => state.cart);
    const activeInfoProduct = useSelector((state) => state.product.activeInfoProduct);
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);
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
        user && !showModal ? dispatch(action) && ToastMessage('success') : setShowModal(true);
    };

    // handle set active info Product :
    const handleSetActiveInfoProduct = (currentInfo) => {
        const action = setActiveInfoProduct(currentInfo);
        dispatch(action);
    };

    console.log(user);

    // ========================== handle comment with firestore ==================================//
    const handlePostComment = () => {
        addDocument('message', {
            fieldName: user.displayName,
            photoURL: user.photoURL,
            text: inputValue,
            id: user.uid,
            currentProductId: id,
            rating: currentValue,
        });

        //  sau khi post thì cho empty ô input :
        setInputValue('');
        // sau khi post thì cho star về lại 0 :
        setCurrentValue(0);
    };

    const condition = useMemo(() => {
        return {
            name: 'currentProductId',
            operator: '==',
            compareValue: id,
        };
    }, [id]);
    const messages = useFirestore('message');
    console.log(messages);

    // intialize array star
    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

    const handleClickStar = (value) => {
        setCurrentValue(value);
    };

    const handleHoverStar = (value) => {
        setHoverValue(value);
    };

    const handleLeaveStar = () => {
        setHoverValue(undefined);
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
                        <div className="w-full lg:w-[552px] md:h-[552px]">
                            {foodProduct.img ? (
                                <img
                                    className="w-full- h-full object-cover"
                                    src={foodProduct.img}
                                    alt={foodProduct.name}
                                />
                            ) : (
                                <Skeleton width={'100%'} height={'100%'} style={{ borderRadius: '5px' }} />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="px-[24px] lg:px-0">
                            <h1 className="text-[25px] mt-[24px] mb-[15px]">{foodProduct.name || <Skeleton />}</h1>
                            <div className="flex items-center justify-start mb-[15px]">
                                {<Star data={foodProduct.rate} inProduct />}
                                <span className="ml-[10px] text-[14px]">Customer reviewes</span>
                            </div>
                            <p className="font-bold text-[25px] text-primary mb-[20px]">
                                {/* ${(foodProduct.price * cartRedux.quantityProduct).toFixed(2) || <Skeleton />} */}
                                {foodProduct.price ? (
                                    `$${(foodProduct.price * cartRedux.quantityProduct).toFixed(2)}`
                                ) : (
                                    <Skeleton />
                                )}
                            </p>
                            <p className="text-[14px] text-[#999999] mb-[20px]">
                                Country: <span className="text-[#000000]">{foodProduct.country || <Skeleton />}</span>
                            </p>
                            <p className="text-[14px] mb-[20px]">{foodProduct.dsc || <Skeleton />}</p>
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
                {/* description and comment */}
                <div className="flex flex-col my-[110px] px-[50px]">
                    <div className="mx-auto mb-[30px]">
                        <button
                            className={`btn-desc-and-review ${
                                activeInfoProduct === 'description' &&
                                'text-white bg-primary hover:shadow-hoverBtnCart ease-linear duration-300'
                            }`}
                            onClick={() => handleSetActiveInfoProduct('description')}
                        >
                            description
                        </button>
                        <button
                            className={`btn-desc-and-review ${
                                activeInfoProduct === 'review' &&
                                'text-white bg-primary hover:shadow-hoverBtnCart ease-linear duration-300'
                            }`}
                            onClick={() => handleSetActiveInfoProduct('review')}
                        >
                            reviews({messages.length})
                        </button>
                    </div>
                    <div className="w-full">
                        <div className={`${activeInfoProduct === 'description' ? 'block' : 'hidden'}`}>
                            this is box description
                        </div>
                        <div className={`${activeInfoProduct === 'review' ? 'block' : 'hidden'}`}>
                            <div>
                                {messages.map((message) => {
                                    return (
                                        <UserComment
                                            id={message.id}
                                            img={message.photoURL}
                                            name={message.fieldName}
                                            // createdAt là 1 object chứa 2 key là nanoSeconds và seconds, nêu khi dùng phải chấm đến 1 trong 2
                                            time={message.createdAt}
                                            message={message.text}
                                            rate={message.rating}
                                        />
                                    );
                                })}
                            </div>
                            <div className="flex mt-[80px]">
                                <img
                                    className="w-[47px] h-[47px] rounded-[50%] object-cover border border-[rgba(0,0,0,0.2)]"
                                    src={user ? user.photoURL : images.noAvatar}
                                />
                                <div className="w-[70%] ml-[20px]">
                                    <div className="flex items-center mb-[10px]">
                                        {stars.map((item, index) => {
                                            return (
                                                <AiFillStar
                                                    key={index}
                                                    onClick={() => handleClickStar(index + 1)}
                                                    onMouseOver={() => handleHoverStar(index + 1)}
                                                    className={`${
                                                        (currentValue || hoverValue) > index
                                                            ? 'text-[#fbb403]'
                                                            : 'text-[#fdda81]'
                                                    } text-[18.5px] ease-out duration-200 cursor-pointer`}
                                                    onMouseLeave={handleLeaveStar}
                                                />
                                            );
                                        })}
                                        <p className="text-[13px] font-medium ml-[8px]">(Please choose an one)</p>
                                    </div>
                                    <textarea
                                        className="p-[15px] border border-[rgba(0,0,0,0.08)] bg-[rgba(0,0,0,0.03)] min-h-[100px] text-[14px] w-full rounded outline-none mb-[20px]"
                                        placeholder="Type your comment here..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    ></textarea>
                                    <button
                                        className="btn-cart-bottom bg-primary text-white hover-btn-primary normal-case"
                                        onClick={handlePostComment}
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;

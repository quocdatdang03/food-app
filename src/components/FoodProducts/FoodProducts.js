import { faBottleWater, faBreadSlice, faHamburger, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai';
import { BsFillGrid1X2Fill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { HiShoppingCart } from 'react-icons/hi';
import { IoIosPin } from 'react-icons/io';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

// react paginate : Phân trang
import ReactPaginate from 'react-paginate';

// react-lazy-load-image-component : load image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import MenuSideBarItem from './MenuSideBarItem';
import PriceInputRadio from './PriceInputRadio';
import Rate from './Rate';
import { request } from '../../utils/request';
import { setViewlayoutProduct, FilterPrice, setInputSearchValue } from '../../redux/ProductSlice';
import { addToCart, resetQuantity } from '../../redux/CartSlice';
import '../../sass/FoodProduct.scss';
import Context from '../../store/Context';
import images from '../../assets/images/images';
import Spinner from '../Spinner/Spinner';

const menuSideBar = [
    {
        icon: faHamburger,
        title: 'Burgers',
        listProduct: 'burgers',
    },
    {
        icon: faBreadSlice,
        title: 'Breads',
        listProduct: 'breads',
    },
    {
        icon: faHamburger,
        title: 'SandWiches',
        listProduct: 'sandwiches',
    },
    {
        icon: faBottleWater,
        title: 'Drinks',
        listProduct: 'drinks',
    },
    {
        icon: faPizzaSlice,
        title: 'Pizzas',
        listProduct: 'pizzas',
    },
];

const priceInputRadio = [
    {
        id: 'price-1',
        title: 'Under $100',
    },
    {
        id: 'price-2',
        title: 'Above $100',
    },
    {
        id: 'price-3',
        title: 'Under $50',
    },
    {
        id: 'price-4',
        title: '$50 To $100',
    },
];

function FoodProduct() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const viewLayoutProduct = useSelector((state) => state.product.viewLayoutProduct);
    const pathProductFilter = useSelector((state) => state.product.pathProduct);
    const filterPrice = useSelector((state) => state.product.priceFilter);
    const filterRate = useSelector((state) => state.product.rateFilter);
    const inputValueSearch = useSelector((state) => state.product.inputSearchValue);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { filterProductData, setFilterProductData, foodData, setFoodData, user, showModal, setShowModal } =
        useContext(Context);
    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            try {
                const res = await request.get(`${pathProductFilter}`);
                setFoodData(res.data);
                setFilterProductData(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, [pathProductFilter]);

    // handle to product page :
    const handleToProductPage = (item) => {
        navigate(`${pathProductFilter}/${item.id}`);
    };

    // handle set view product :grid or list :
    const handleSetViewProduct = (type) => {
        const action = setViewlayoutProduct(type);
        dispatch(action);
    };

    // handle Filter By Price :
    const handleFilterByPrice = (currentPrice) => {
        const action = FilterPrice(currentPrice);
        dispatch(action);
    };
    useEffect(() => {
        const filterProduct = foodData.filter((item) => {
            return filterPrice === ''
                ? item
                : filterPrice === 'price-1'
                ? item.price < 100
                : filterPrice === 'price-2'
                ? item.price > 100
                : filterPrice === 'price-3'
                ? item.price < 50
                : item.price >= 50 && item.price <= 100;
        });
        setFilterProductData(filterProduct);
    }, [filterPrice]);

    // =============== handle paginate ================== //
    const PER_PAGE = 16;

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    // 0,10,20,30...
    const offset = currentPage * PER_PAGE;

    const currentPageData = filterProductData.slice(offset, offset + PER_PAGE).map((item) => {
        return (
            <div
                // to={`${pathProductFilter}/${item.id}`}
                onClick={() => handleToProductPage(item)}
                className={`w-full cursor-pointer group ${
                    viewLayoutProduct === 'list' ? 'flex items-center mb-[20px]' : ''
                }`}
                key={item.id}
            >
                <div
                    className={`relative ${
                        viewLayoutProduct === 'list' ? 'w-[235px] h-[155px] mr-[10px]' : 'h-[165px] w-full'
                    }`}
                >
                    <LazyLoadImage
                        className="object-cover w-full h-full"
                        key={item.id}
                        src={item.img}
                        alt={item.name}
                        effect="blur"
                        width="100%"
                        height="100%"
                    />
                    <p
                        className="absolute bottom-[0px] left-[10px] flex items-center text-[30px] text-white font-bold leading-5"
                        style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
                    >
                        <AiFillStar size={'19px'} />
                        {item.rate}
                    </p>
                    <button
                        className="w-[30px] h-[30px] text-white hover:text-primary absolute top-[20px] right-[10px] opacity-0 translate-x-[10px] invisible group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible flex items-center justify-center rounded-[50%] bg-[rgba(0,0,0,0.8)] ease-linear duration-150"
                        onClick={(e) => handleAddToCart(e, item)}
                    >
                        <HiShoppingCart className="" />
                    </button>
                </div>
                <div>
                    <h1 className="text-[17px] font-semibold leading-[19px] mt-[8px] mb-[6px] ease-in duration-150 hover:text-primary food-name">
                        {item.name}
                    </h1>
                    <p className="text-[13px] leading-[15px] min-h-[40px] font-normal food-desc">{item.dsc}</p>
                    <div
                        className={`flex justify-between my-[5px] ${
                            viewLayoutProduct === 'list' ? 'flex-col' : 'items-center'
                        }`}
                    >
                        <p className="flex items-center">
                            <IoIosPin size={'18px'} className="text-primary" />
                            <span className="text-[13px]">{item.country}</span>
                        </p>
                        <p className="text-[18px] text-primary font-semibold">${item.price}</p>
                    </div>
                </div>
            </div>
        );
    });

    const pageCount = Math.ceil(filterProductData.length / PER_PAGE);

    // =============== End handle paginate ================== //

    // handle Search Product :
    const handleSetInputSearchValue = (e) => {
        const action = setInputSearchValue(e.target.value);
        dispatch(action);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const filterProductSearch = foodData.filter((item) => {
            return item.name.toLowerCase().trim().includes(inputValueSearch.toLowerCase().trim());
        });
        setFilterProductData(filterProductSearch);

        // set empty input search :
        dispatch(setInputSearchValue(''));
    };
    // handleAddToCart :
    const handleAddToCart = (e, currentProduct) => {
        e.stopPropagation();
        const action = addToCart(currentProduct);
        user && !showModal ? dispatch(action) : setShowModal(true);
    };

    // handle reset Quantity : Xử lý khi quay lại trang này thì cho quantity về lại bằng 1 :
    useEffect(() => {
        dispatch(resetQuantity());
    });

    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1 mt-[18px] hidden lg:block">
                <div>
                    <h2 className="text-[20px] font-bold mb-[10px] py-[8px] pl-[8px] border-b-2 border-[#d9d9d9] leading-5 mt-[18px]">
                        Popular
                    </h2>
                    <div>
                        {menuSideBar.map((item, index) => {
                            return (
                                <MenuSideBarItem
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    pathProduct={item.listProduct}
                                />
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h2 className="text-[20px] font-bold mb-[10px] py-[8px] pl-[8px] border-b-2 border-[#d9d9d9] leading-5 mt-[18px]">
                        Price
                    </h2>
                    <div>
                        {priceInputRadio.map((item, index) => {
                            return (
                                <PriceInputRadio
                                    nameFor={item.id}
                                    title={item.title}
                                    key={index}
                                    onClick={() => handleFilterByPrice(item.id)}
                                    active={item.id}
                                />
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h2 className="text-[20px] font-bold mb-[10px] py-[8px] pl-[8px] border-b-2 border-[#d9d9d9] leading-5 mt-[18px]">
                        Rate
                    </h2>
                    <div>
                        <Rate />
                    </div>
                </div>
            </div>
            <div className="col-span-6 lg:col-span-5">
                <div className="flex items-center">
                    {/* Box search */}
                    <form
                        className="bg-white flex-1 flex border border-[#d9d9d9] pl-[15px] py-[5px] rounded-[20px] overflow-hidden sm:mx-[30px]"
                        onSubmit={(e) => handleSearch(e)}
                    >
                        <input
                            className="flex-1 text-[13px] outline-none bg-transparent"
                            type="text"
                            placeholder="Search your product"
                            value={inputValueSearch}
                            onChange={(e) => handleSetInputSearchValue(e)}
                        />
                        <button className=" w-[50px] h-[30px] flex items-center justify-center">
                            <AiOutlineSearch color="#999999" size={'20px'} />
                        </button>
                    </form>
                    {/* btn grid */}
                    <div className="flex item-center">
                        <button
                            className="w-[32px] h-[32px] hidden sm:flex"
                            onClick={() => handleSetViewProduct('grid')}
                        >
                            <BsFillGrid3X3GapFill
                                className={`text-[24px] ${
                                    viewLayoutProduct === 'grid' ? 'text-primary' : 'text-[#8c8c8c]'
                                }`}
                            />
                        </button>
                        <button
                            className="w-[32px] h-[32px] hidden sm:flex"
                            onClick={() => handleSetViewProduct('list')}
                        >
                            <BsFillGrid1X2Fill
                                className={`text-[22px] ${
                                    viewLayoutProduct === 'list' ? 'text-primary' : 'text-[#8c8c8c]'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* show empty product */}
                {!loading && filterProductData.length === 0 && (
                    <div className="flex items-center justify-center w-full pt-[120px]">
                        <div>
                            <img className="w-[500px]" src={images.emptyProduct} />
                            <p className="text-[22px] font-semibold leading-[17px] mt-[25px] text-center">
                                There Is No Product You Are Looking For
                            </p>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="w-full pt-[150px] flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <div
                            className={`grid ${
                                viewLayoutProduct === 'list'
                                    ? 'grid-cols-1'
                                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                            } gap-[8px] sm:gap-[14px] pt-[22px] pb-[30px] lg:pl-[20px]`}
                        >
                            {currentPageData}
                        </div>
                        {filterProductData.length !== 0 && !loading && (
                            <ReactPaginate
                                breakLabel="..."
                                marginPagesDisplayed={3}
                                previousLabel={<GrPrevious size={'12px'} />}
                                nextLabel={<GrNext size={'12px'} />}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                // css :
                                containerClassName="pagination"
                                pageLinkClassName="pagination__item"
                                previousLinkClassName="pagination__item-previous"
                                nextLinkClassName="pagination__item-next"
                                activeLinkClassName="pagination__item--active"
                                disabledLinkClassName="pagination__item--disable"
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default FoodProduct;

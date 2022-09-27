import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { FilterPrice, FilterRate, setpathProduct } from '../../../redux/ProductSlice';

function MenuSideBarItem({ icon, title, pathProduct }) {
    const pathProductFilter = useSelector((state) => state.product.pathProduct);
    const dispatch = useDispatch();
    const handleFilterProductByName = () => {
        const action = setpathProduct(pathProduct);
        dispatch(action);

        // Khi click qua danh mục món ăn khác thì xét cho priceFilter thành chuỗi rỗng (để khi ấn qua cái khác thì không dính filter của danh mục món ăn trước đó)
        dispatch(FilterPrice(''));
        dispatch(FilterRate(null));
    };
    return (
        <button
            className={`flex items-center py-[10px] px-[8px] w-full hover:bg-[#ebebeb] ${
                pathProductFilter === pathProduct ? 'bg-[#ebebeb]' : ''
            } rounded-md ease-out duration-150`}
            onClick={handleFilterProductByName}
        >
            <span className="w-[30px] flex items-center justify-center">
                <FontAwesomeIcon icon={icon} className="text-[22px] text-[#767676]" />
            </span>
            <p className="text-[14px] ml-[8px]">{title}</p>
        </button>
    );
}

export default MenuSideBarItem;

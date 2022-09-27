import Star from './Star/Star';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';

import { FilterRate } from '../../../redux/ProductSlice';
import Context from '../../../store/Context';

const starRate = [
    {
        star: 5,
    },
    {
        star: 4,
    },
    {
        star: 3,
    },
];

function Rate() {
    const { setFilterProductData, foodData } = useContext(Context);
    const filterRate = useSelector((state) => state.product.rateFilter);
    const dispatch = useDispatch();
    // handle Filter rate :
    const handleRateFilter = (currentRate) => {
        const action = FilterRate(currentRate);
        dispatch(action);
    };

    useEffect(() => {
        const filterProduct = foodData.filter((item) => {
            return filterRate === null
                ? item
                : filterRate === 5
                ? item.rate === 5
                : filterRate === 4
                ? item.rate === 4
                : item.rate === 3;
        });
        setFilterProductData(filterProduct);
    }, [foodData, filterRate]);

    return (
        <div>
            {starRate.map((item, index) => {
                return <Star key={index} index={index} data={item.star} onClick={() => handleRateFilter(item.star)} />;
            })}
        </div>
    );
}

export default Rate;

import { useSelector } from 'react-redux';

function PriceInputRadio({ nameFor, title, onClick, active }) {
    const priceFilter = useSelector((state) => state.product.priceFilter);
    return (
        <label
            htmlFor={nameFor}
            className="w-full flex items-center cursor-pointer py-[5px] px-[9px]"
            onClick={onClick}
        >
            <span className="">
                {active === priceFilter ? (
                    <input type="radio" id={nameFor} name="price" checked />
                ) : (
                    <input type="radio" id={nameFor} name="price" />
                )}
            </span>
            <label className="cursor-pointer text-[14px]" htmlFor={nameFor}>
                {title}
            </label>
        </label>
    );
}

export default PriceInputRadio;

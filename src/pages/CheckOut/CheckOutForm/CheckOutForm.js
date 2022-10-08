import { useNavigate } from 'react-router-dom';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import countriesList from '../../../utils/countriesList';

function CheckOutForm() {
    const navigate = useNavigate();
    const handleNavigateToShop = () => {
        navigate('/order');
    };

    const handleCheckOut = (e) => {
        e.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            LastName: '',
            Address: '',
            country: '',
            phone: '',
        },

        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 mb-[20px] gap-x-[20px]">
                <input
                    className="col-span-1 p-[10px] border border-[#d9d9d9] rounded-[4px] outline-none text-[14px]"
                    placeholder="First name"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                />
                <input
                    className="p-[10px] border border-[#d9d9d9] rounded-[4px] outline-none text-[14px]"
                    placeholder="Last Name"
                    id="LastName"
                    name="LastName"
                    value={formik.values.LastName}
                    onChange={formik.handleChange}
                />
            </div>
            <input
                className="w-full p-[10px] border border-[#d9d9d9] rounded-[4px] outline-none text-[14px] mb-[20px]"
                placeholder="Address"
                id="Address"
                name="Address"
                onChange={formik.handleChange}
            />
            <div className="grid grid-cols-2 gap-x-[20px]">
                <select
                    className="p-[10px] border border-[#d9d9d9] rounded-[4px] outline-none text-[14px]"
                    placeholder="Select a country"
                    id="country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                >
                    {countriesList.map((item, index) => {
                        return (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </select>
                <input
                    className="p-[10px] border border-[#d9d9d9] rounded-[4px] outline-none text-[14px]"
                    type="tel"
                    placeholder="Phone"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex items-center justify-between mt-[30px]">
                <div
                    className="text-primary flex items-center font-semibold cursor-pointer"
                    onClick={handleNavigateToShop}
                >
                    <RiArrowLeftSLine size={'18px'} />
                    <span className="text-[13px]">Return to shop</span>
                </div>
                <button
                    className="btn-cart-bottom hover-btn-primary bg-primary text-white flex-grow-0 px-[30px]"
                    onClick={(e) => handleCheckOut(e)}
                    type="submit"
                >
                    Checkout
                </button>
            </div>
        </form>
    );
}

export default CheckOutForm;

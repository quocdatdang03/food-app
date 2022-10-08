import { useContext } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

import { Context } from '../../store/Context';

function ButtonScrollTop() {
    const { showBtnScrollTop } = useContext(Context);

    // handle scroll to top :
    const handleScrollToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    return (
        <div
            className={`fixed bottom-[50px] right-[30px] ease-out duration-300 ${
                showBtnScrollTop ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-[200px]'
            }`}
            onClick={handleScrollToTop}
        >
            <button
                className={`flex items-center justify-center w-[53px] h-[53px] bg-white cursor-pointer rounded-[50%] shadow-boxCheckout ease-linear duration-200 group hover:bg-primary`}
            >
                <IoIosArrowUp size={'30px'} className="text-primary group-hover:text-white" />
            </button>
        </div>
    );
}

export default ButtonScrollTop;

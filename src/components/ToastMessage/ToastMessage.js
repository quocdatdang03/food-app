// import mã màu :
import { AiFillCheckCircle, AiFillSetting } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';

import { toast } from 'react-toastify';
// import { SUCCESS_COLOR, CLOSED_COLOR } from '../../constants/color';

const toastTypes = {
    success: {
        title: 'Success',
        desc: 'The product has been add to cart',
        color: '#43d787',
        icon: <AiFillCheckCircle />,
    },
    closed: {
        title: 'Closed!',
        desc: 'This feature is currently closed. Try login with Google or Facebook',
        color: '#3598DB',
        icon: <AiFillSetting />,
    },
};

function ToastMessage(type) {
    // Cách truy cập của key của object
    const toastType = toastTypes[type];
    console.log(toastType);
    // Hoặc có thể dùng như sau : const toastType = toastTypes.type;

    toast(
        <div className={`flex items-center relative rounded-[4px] bg-[${toastType.color}]`}>
            <div className="text-[23px] mr-[12px]">{toastType.icon}</div>
            <div>
                <h1 className="text-[16px] mb-[10px]">{toastType.title}</h1>
                <p className="text-[13px] leading-5">{toastType.desc}</p>
            </div>
        </div>,
        {
            position: type === 'success' ? 'top-left' : 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: <MdLogout size={'23px'} />,
        },
    );
}

export default ToastMessage;

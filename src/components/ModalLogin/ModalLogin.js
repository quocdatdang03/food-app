import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Context from '../../store/Context';

function ModalLogin() {
    const { showModal, setShowModal } = useContext(Context);
    const navigate = useNavigate();
    // handle to sign in page :
    const handleToSignIn = () => {
        navigate('/signin');
        setShowModal(false);
    };
    return (
        // min-w-max : chiều rộng tối thiểu là max chiều rộng hiện tại
        <div
            className={`fixed min-w-max bg-white top-[50%] left-[50%] translate-x-[-50%] p-[20px] shadow-boxCheckout rounded-[4px] z-100 ease-out duration-300 ${
                showModal ? 'translate-y-[-50%] visible opacity-100' : 'translate-y-[200px] invisible opacity-0'
            }`}
        >
            <div className="w-full">
                <h1 className="text-[16px] mb-[17px]">JOIN WITH US 🚀</h1>
                <p className="text-[15px]">You are not signed in. Please sign in to use this feature!</p>
                <div className="mt-[40px] flex items-center justify-end">
                    <button
                        className="btn-modal hover:bg-[#f5f5f5] hover:shadow-buttonCart mr-[10px]"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-modal bg-primary hover-btn-primary text-white rounded-[4px]"
                        onClick={handleToSignIn}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalLogin;

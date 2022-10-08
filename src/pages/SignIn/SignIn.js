import { AiFillFacebook, AiFillSetting, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// toastify : toast nofication
import { toast } from 'react-toastify';

import images from '../../assets/images/images';
import { auth, db } from '../../firebase/config';
import firebase from '../../firebase/config';
import ToastMessage from '../../components/ToastMessage';
import addDocument from '../../firebase/service';

function SignIn() {
    const inputRef = useRef();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        onSubmit: (values) => {
            // Phải đúng yêu cầu validate như dưới mới submit được
            console.log(values);
            // khi submit thì hiện ra thông báo là tính năng đã đóng vui lòng đăng nhập với FB or Google :
            if (values) {
                handleNotify();
            }
            inputRef.current.value = '';
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is Invalid')
                .required('Email Is Required'),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Password must be 8 characters, at least 1 one uppercase letter, 1 lowercase letter, 1 number and 1 social letter',
                )
                .required('Password Is Required'),
        }),
    });

    // console.log(formik.errors);

    // handle sigin in with facebooka and google with firebase :
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbLogin = async () => {
        const data = await auth.signInWithPopup(fbProvider);
        console.log({ data });
    };
    // handle google login :
    const GGProvider = new firebase.auth.GoogleAuthProvider();
    // auth.signInWithPopup sẽ trả ra 1 Promise nên dùng hàm async để làm
    const handleGoogleLogin = async () => {
        // Lấy ra user và additionalUserInfo từ Promise trả về :
        // const data = await auth.signInWithPopup(GGProvider);
        // console.log({ data });
        const { user, additionalUserInfo } = await auth.signInWithPopup(GGProvider);

        // khi nếu là khoản là isNewUser thì thêm lưu vào đó 1 collection (tương tự bảng trong SQL)
        if (additionalUserInfo.isNewUser) {
            /*
            db.collection('users').add({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.displayName,
                providerID: additionalUserInfo.providerId,
            });
            */
            // đưa collection ra cấu hình riêng để tái sử dụng được ở nhiều nơi khác : tạo file service
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.displayName,
                providerID: additionalUserInfo.providerId,
            });
        }
    };

    // handle notify :
    const handleNotify = () => {
        ToastMessage('closed');
    };

    // useEffect(() => {
    //     db.collection('users').onSnapshot((snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         console.log({ data, snapshot, docs: snapshot.docs });
    //     });
    // }, []);

    return (
        <div className="">
            <div className="max-w-primary mx-auto my-[50px] lg:my-[150px] grid grid-cols-1 lg:grid-cols-2 shadow-boxSignIn lg:px-[75px]">
                <div className="col-span-1 bg-signup w-full h-full bg-cover bg-center hidden lg:block"></div>
                <div className="w-full px-[10px] md:px-[50px] py-[20px] lg:py-[60px]">
                    <h1 className="text-[20px] uppercase">Join with us</h1>
                    <p className="text-[13px] text-[#99a7b0] my-[15px]">
                        Don't have an account?
                        <span className=" ml-[5px] font-semibold text-primary cursor-pointer" onClick={handleNotify}>
                            Create an account
                        </span>
                    </p>
                    {/* <ToastContainer
                        // bodyClassName={'bg-red-400 p-0'}
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}`
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    /> */}
                    <form onSubmit={formik.handleSubmit}>
                        <label className="text-[13px]" htmlFor="email">
                            Email address
                        </label>
                        <div className="flex items-center bg-[#f5f5f5] mt-[7px] mb-[25px] pr-[10px] relative">
                            <AiOutlineMail className="text-[18px] mx-[8px]" />
                            <input
                                type="email"
                                className="text-[14px] py-[12px] bg-transparent outline-none w-full"
                                id="email"
                                name="email"
                                placeholder="Your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                ref={inputRef}
                            ></input>
                            {formik.errors.email && (
                                <span className="absolute top-[110%] left-0 text-[13px] text-primary">
                                    {formik.errors.email}
                                </span>
                            )}
                        </div>
                        <label className="text-[13px]" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center bg-[#f5f5f5] mt-[7px] mb-[25px] pr-[10px] relative">
                            <AiOutlineLock className="text-[18px] mx-[8px]" />
                            <input
                                type="password"
                                className="text-[14px] py-[12px] bg-transparent outline-none w-full"
                                id="password"
                                name="password"
                                placeholder="Your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                ref={inputRef}
                            ></input>
                            {formik.errors.password && (
                                <span className="absolute top-[110%] left-0 text-[13px] text-primary">
                                    {formik.errors.password}
                                </span>
                            )}
                        </div>
                        <button className="text-[13px] bg-primary hover:bg-[#c33d3b] hover:shadow-hoverBtnCart ease-in-out duration-200 text-white uppercase font-semibold py-[8px] px-[15px] min-w-[95px] rounded-[999px] tracking-widest flex items-center justify-center mx-auto">
                            Login
                        </button>
                    </form>
                    <div className="relative flex items-center justify-center my-[15px]">
                        <span className="inline-block text-[13px] text-[#a39999] uppercase bg-white z-10 px-[5px]">
                            or
                        </span>
                        <div className="absolute w-full h-[1px] bg-[#e5e5e5] top-[50%] translate-y-[-50%]"></div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="flex items-center justify-center py-[10px] px-[13px] bg-white hover:bg-[#ebe9e9] ease-in duration-200 rounded-[999px] flex-1 shadow-btnSignIn mr-[20px]"
                            onClick={handleGoogleLogin}
                        >
                            <img
                                className="w-[22px] h-[22px] object-cover mr-[5px]"
                                src={images.iconGoogle}
                                alt="google"
                            />
                            <span className="text-[13px] font-medium">Log in With Google</span>
                        </button>
                        <button
                            className="flex items-center justify-center py-[10px] px-[13px] bg-white hover:bg-[#ebe9e9] ease-in duration-200 rounded-[999px] flex-1 shadow-btnSignIn"
                            onClick={handleFbLogin}
                        >
                            <AiFillFacebook className="w-[22px] h-[22px] text-[#4166b1] mr-[5px]" />
                            <span className="text-[13px] font-medium">Log in With Facebook</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;

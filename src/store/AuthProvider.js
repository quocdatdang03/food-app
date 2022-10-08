import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from './Context';
import { auth } from '../firebase/config';

function AuthProvider({ children }) {
    // Xử lý login / signIn :
    const navigate = useNavigate();
    // const location = useLocation();
    const { pathname } = useLocation();
    const pathNameSignIn = '/signin';
    // console.log(pathname);
    // dùng location.pathname hoặd lấy pathname ra bằng destructuring : const { pathname } = useLocation();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unSubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, photoURL, uid } = user;
                setUser({ displayName, email, photoURL, uid });

                // Nếu đường dẫn hiện tại là /signin thì chuyển hướng đến trang home'
                if (pathname.includes(pathNameSignIn)) {
                    navigate('/');
                }
            }
        });
        // clean up function :
        return unSubscribed;
    }, []);
    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

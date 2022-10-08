import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RoutesLayout from './routes';
import ModalLogin from './components/ModalLogin';
import ButtonScrollTop from './components/ButtonScrollTop';

function App() {
    return (
        <div className="App w-full">
            <RoutesLayout />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ModalLogin />
            <ButtonScrollTop />
        </div>
    );
}

export default App;

import Header from '../components/Header';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="">{children}</div>
        </div>
    );
}

export default DefaultLayout;

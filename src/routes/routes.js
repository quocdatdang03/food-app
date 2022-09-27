import Home from '../pages/Home/Home';
import Order from '../pages/Order';
import Previews from '../pages/Previews';
import SignIn from '../pages/SignIn';
import Product from '../pages/Product';

import DefaultLayout from '../layout/DefaultLayout/DefaultLayout';
import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckOut from '../pages/CheckOut/CheckOut';

function RoutesLayout() {
    const pathProductFilter = useSelector((state) => state.product.pathProduct);
    const publicRoutes = [
        {
            component: Home,
            path: '/',
        },
        {
            component: Order,
            path: '/order',
        },
        {
            component: Previews,
            path: '/previews',
        },
        {
            component: SignIn,
            path: '/signin',
            layout: null,
        },
        {
            component: Product,
            path: `/${pathProductFilter}/:id`,
        },
        {
            component: Product,
            path: `/order/${pathProductFilter}/:id`,
        },
        {
            component: CheckOut,
            path: '/checkout',
        },
    ];
    return (
        <Routes>
            {publicRoutes.map((item, index) => {
                let Layout = DefaultLayout;
                if (Layout === item.layout) {
                    Layout = item.layout;
                } else if (item.layout === null) {
                    Layout = Fragment;
                }
                const Page = item.component;
                return (
                    <Route
                        key={index}
                        path={item.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default RoutesLayout;
// const publicRoutes = [
//     {
//         component: Home,
//         path: '/',
//     },
//     {
//         component: Order,
//         path: '/order',
//     },
//     {
//         component: Previews,
//         path: '/previews',
//     },
//     {
//         component: SignIn,
//         path: '/signin',
//         layout: null,
//     },
//     {
//         component: Product,
//         path: '/best-foods/:id',
//     },
// ];

// const privateRoutes = [];

// export { publicRoutes, privateRoutes };

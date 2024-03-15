import {HomePage} from "../pages/HomePage/HomePage";
import {NotFoundPage} from "../pages/NotFoundPage/NotFoundPage";
import {OrderPage} from "../pages/OrderPage/OrderPage";
import {ProductsPage} from "../pages/ProductsPage/ProductsPage";

const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    },   
];

export default routes;
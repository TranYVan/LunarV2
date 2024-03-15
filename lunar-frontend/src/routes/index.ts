import HomePage from "../pages/HomePage/HomePage";
import NotFoundpage from "../pages/NotFoundPage/NotFoundpage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: "/products",
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: "*",
        page: NotFoundpage

    }

]

export default routes;
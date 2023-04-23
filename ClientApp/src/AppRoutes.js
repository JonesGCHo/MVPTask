import { Home } from "./components/Home";
import FetchCustomers from "./components/Customers/FetchCustomers";
import FetchProducts from "./components/Products/FetchProducts";
import FetchStores from "./components/Stores/FetchStores";
import FetchSales from "./components/Sales/FetchSales";

const AppRoutes = [
    {
    index: true,
    element: <Home />
    },
    {
    path: '/FetchCustomers',
    element: <FetchCustomers />
    },
    {
        path: '/FetchProducts',
        element: <FetchProducts />
    },
    {
        path: '/FetchStores',
        element: <FetchStores />
    },
    {
        path: '/FetchSales',
        element: <FetchSales />
    }
  
];

export default AppRoutes;

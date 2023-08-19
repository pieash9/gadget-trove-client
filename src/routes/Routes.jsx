import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Contact from "../pages/Contact/Contact";
import ShopCategory from "../components/Shop/ShopCategory";
import AddProduct from "../pages/Dashboard/Seller/AddProduct";
import ManageProducts from "../pages/Dashboard/Seller/ManageProducts";
import SellerProfile from "../pages/Dashboard/Seller/SellerProfile";
import MyProducts from "../pages/Dashboard/Seller/MyProducts";
import ManageUsers from "../pages/Dashboard/Admin/ManageUSers";
import ManageAllProducts from "../pages/Dashboard/Admin/ManageAllProducts";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../pages/Home/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import PaymentSuccess from "../components/PaymentStatus/PaymentSuccess";
import PaymentFail from "../components/PaymentStatus/PaymentFail";
import PaymentCancel from "../components/PaymentStatus/PaymentCancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "payment/success/:tran_id",
        element: <PaymentSuccess />,
      },
      {
        path: "payment/fail/:tran_id",
        element: <PaymentFail />,
      },
      {
        path: "payment/cancel/:tran_id",
        element: <PaymentCancel />,
      },
      {
        path: "products/:category",
        element: <ShopCategory />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.category}`),
      },

      {
        path: "item/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/singleProducts/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      //? Admin
      {
        path: "admin/manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "admin/manageAllProducts",
        element: <ManageAllProducts />,
      },

      //? seller
      {
        path: "seller/addProduct",
        element: <AddProduct />,
      },
      {
        path: "seller/manageProduct",
        element: <ManageProducts />,
      },
      {
        path: "seller/myProducts",
        element: <MyProducts />,
      },
      {
        path: "seller/sellerProfile",
        element: <SellerProfile />,
      },
    ],
  },
]);

export default router;

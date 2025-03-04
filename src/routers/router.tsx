import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/about/About";
import Category from "../Pages/Categories/Category";
import Search from "../Pages/search/Search";
import ProductDetails from "../Pages/Shop/product/ProductDetails";
import Login from "../Pages/Registration/Login"
import Register from "../Pages/Registration/Register"
import ForgetPassword from "../Pages/Registration/ForgetPassword"
import VerifyOTP from "../Pages/Registration/VerifyOTP"
import UpdatePassword from "../Pages/Registration/UpdatePassword";
import SingleBlog from "../Pages/blogs/SingleBlog"
import Super from "../Pages/Super"
import TrackOrder from "../Pages/Track Order/TrackOrder";
import DashboardLayout from "../Pages/Dashboard/Layout/DashboardLayout";
import Profile from "../Pages/Dashboard/Profile"
import UserData from "../Pages/Dashboard/UserData";
import PurchasedItemsTable from "../Pages/Dashboard/PurchasedItems";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/shop", element: <Shop /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            { path: "/categories/:category", element: <Category /> },
            { path: "/search", element: <Search /> },
            { path: "/shop/:id", element: <ProductDetails /> },
            { path: "/blogs/:id", element: <SingleBlog /> },
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgetpassword", element: <ForgetPassword /> },
    {
        element: <Super />,
        children: [
            { path: "/verifyOTP", element: <VerifyOTP /> },
            { path: "/password/update", element: <UpdatePassword /> }
        ]
    },
    { path: "/track/order", element: <TrackOrder /> },
    { path: "/success", element: <div>Success</div> },
    { path: "/cancel", element: <div>Cancel</div> },

    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Profile /> },
            { path: "profile", element: <Profile /> },
            { path: "user/data", element: <UserData /> },
            { path: "purchased", element: <PurchasedItemsTable /> }
        ]
    }
]);

export default router;

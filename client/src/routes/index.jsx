import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import SearchPage from "../pages/SearchPage"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ForgotPassword from "../pages/ForgotPassword"
import VerifyOtp from "../pages/VerifyOtp"
import ResetPassword from "../pages/ResetPassword"
import UserMenuMobile from "../pages/UserMenuMobile"
import Dashboard from "../layouts/Dashboard"
import MyProfile from "../pages/MyProfile"
import MyOrders from "../pages/MyOrders"
import Addresses from "../pages/Addresses"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path:"",
                element: <Home/>
            },
            {
                path:"search",
                element: <SearchPage />
            },
            {
                path:"login",
                element: <Login />
            },
            {
                path:"signup",
                element: <Signup />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path : 'verify-otp',
                element: <VerifyOtp />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
            },
            {
                path: "user-mobile-version",
                element: <UserMenuMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <MyProfile />
                    },
                    {
                        path: "orders",
                        element: <MyOrders />
                    },
                    {
                        path: "addresses",
                        element: <Addresses />
                    }
                ]
            }
        ]
    }
])

export default router
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
import PrivateRoute from "./PrivateRoute"
import AdminRoute from "./AdminRoute"
import CategoryPage from "../pages/CategoryPage"
import SubCategoryPage from "../pages/SubCategoryPage"
import UploadProducts from "../pages/UploadProducts"
import ProductAdmin from "../pages/ProductAdmin"

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
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
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
                    },
                    // Admin routes
                    {
                        path: "category",
                        element: (
                            <AdminRoute>
                                <CategoryPage />
                            </AdminRoute>
                        )
                    },
                    {
                        path: "subcategory",
                        element: (
                            <AdminRoute>
                                <SubCategoryPage />
                            </AdminRoute>
                        )
                    },
                    {
                        path: "upload-product",
                        element: (
                            <AdminRoute>
                                <UploadProducts />
                            </AdminRoute>
                        )
                    },
                    {
                        path: "products",
                        element: (
                            <AdminRoute>
                                <ProductAdmin />
                            </AdminRoute>
                        )
                    }

                ]
            }
        ]
    }
])

export default router
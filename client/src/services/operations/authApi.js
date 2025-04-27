import {toast} from "react-hot-toast";
import {apiConnector} from '../apiconnector'
import {authEndpoints} from "../apis"
import {setLoading, setAccessToken, setRefreshToken} from "../../slices/authSlice"
import {getUserDetails} from "./profileApi"

const {
    LOGIN_API,
    SIGNUP_API,
    FORGOT_PASSWORD_API,
    RESET_PASSWORD_API,
    FORGOT_PASSWORD_OTP_VERIFY_API,
    VERIFY_EMAIL_API,
    REFRESH_TOKEN_API
} = authEndpoints

export function signUp (data, navigate)  {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('POST', SIGNUP_API, data)
            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function login (email, password, navigate)  {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('POST', LOGIN_API, {email, password})
            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Login Successful");

            //set token in slice
            dispatch(setAccessToken(response.data.data.accessToken))
            dispatch(setRefreshToken(response.data.data.refreshToken))


            localStorage.setItem("accessToken", JSON.stringify(response.data.data.accessToken));

            localStorage.setItem("refreshToken", JSON.stringify(response.data.data.refreshToken));

            dispatch(getUserDetails(response?.data?.data?.accessToken))

            navigate("/");
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed");
            navigate("/login");
        }
        toast.dismiss(toastId);
    }
}

export function forgotPassword (email, navigate)  {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('PUT', FORGOT_PASSWORD_API, {email})
            console.log("FORGOT PASSWORD API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("OTP Sent to your email");
            navigate("/verify-otp",{
                state: { email: email } // Pass the email to the next page
            });
        } catch (error) {
            console.log("FORGOT PASSWORD API ERROR............", error);
            toast.error("Failed to send OTP");
            navigate("/forgot-password");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function verifyOtp (email, otp, navigate)  {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('PUT', FORGOT_PASSWORD_OTP_VERIFY_API, {email, otp})
            console.log("VERIFY OTP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("OTP Verified Successfully");
            navigate("/reset-password", {
                state: { email: email } // Pass the email to the next page
            });
        } catch (error) {
            console.log("VERIFY OTP API ERROR............", error);
            toast.error("Failed to verify OTP");
            navigate("/verify-otp");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function resetPassword (email, password, navigate)  {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('PUT', RESET_PASSWORD_API, {email, password})
            console.log("RESET PASSWORD API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Password Reset Successfully");
            navigate("/login");
        } catch (error) {
            console.log("RESET PASSWORD API ERROR............", error);
            toast.error("Failed to reset password");
            navigate("/reset-password");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export async function generateRefreshAccessToken (refreshToken) {
    const toastId = toast.loading("Loading...")
    let token = null
    try {
        const response = await apiConnector('POST', REFRESH_TOKEN_API, {refreshToken})
        console.log("REFRESH TOKEN API RESPONSE............", response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        token = response.data.data.accessToken
        localStorage.setItem("accessToken", JSON.stringify(response.data.data.accessToken));
    } catch (error) {
        console.log("REFRESH TOKEN API ERROR............", error);
        toast.error("Failed to refresh token");
    }
    toast.dismiss(toastId);
    return token
}
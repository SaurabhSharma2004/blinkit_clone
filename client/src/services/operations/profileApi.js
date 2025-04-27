import {toast} from "react-hot-toast"
import {apiConnector} from "../apiconnector"
import { profileEndpoints } from "../apis"
import { setLoading, setUser } from "../../slices/profileSlice"

const {
    GET_USER_DETAILS_API,
    UPLOAD_AVATAR_API,
    UPDATE_USER_DETAILS_API
} = profileEndpoints

export function getUserDetails (accessToken) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
                Authorization: `Bearer ${accessToken}`
            })
            console.log("GET_USER_DETAILS_API", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Something went wrong while fetching user details")
            }

            localStorage.setItem("user", JSON.stringify(response.data.data));
            dispatch(setUser(response.data.data))

            // toast.success("User details fetched successfully")
        } catch (error) {
            console.log("GET_USER_DETAILS_API error", error);
            toast.error("Could not fetch user details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function uploadAvatar (accessToken, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        console.log("uploadAvatar", formData);
        try {
            const response = await apiConnector("PUT", UPLOAD_AVATAR_API, formData, {
                Authorization: `Bearer ${accessToken}`
            })
            console.log("UPLOAD_AVATAR_API", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Something went wrong while uploading avatar")
            }

            localStorage.setItem("user", JSON.stringify({...response.data.data, avatar: response.data.data.avatar}));
            dispatch(setUser({...response.data.data, avatar: response.data.data.avatar}))

            toast.success("Avatar uploaded successfully")
        } catch (error) {
            console.log("UPLOAD_AVATAR_API error", error);
            toast.error("Could not upload avatar")
        } 
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function updateUserDetails (accessToken, formData) {
    return async (dispatch) => {
        console.log("updateUserDetails", formData);
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("PUT", UPDATE_USER_DETAILS_API, formData, {
                Authorization: `Bearer ${accessToken}`
            })
            console.log("UPDATE_USER_DETAILS_API", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Something went wrong while updating user details")
            }

            localStorage.setItem("user", JSON.stringify({
                ...response.data.data, 
                name: response.data.data.name,
                email: response.data.data.email,
                mobile: response.data.data.mobile
            }));
            dispatch(setUser({
                ...response.data.data, 
                name: response.data.data.name,
                email: response.data.data.email,
                mobile: response.data.data.mobile
            }))

            toast.success("User details updated successfully")
        } catch (error) {
            console.log("UPDATE_USER_DETAILS_API error", error);
            toast.error("Could not update user details")
        } 
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}
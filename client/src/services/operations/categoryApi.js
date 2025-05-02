import { toast } from "react-hot-toast";
import { apiConnector } from '../apiconnector'
import {setLoading, removeCategory, addCategory, updateCategory} from "../../slices/categorySlice";

import { categoryEndpoints } from "../apis";

const {
    CREATE_CATEGORY_API,
    GET_ALL_CATEGORIES_API,
    UPDATE_CATEGORY_API,
    GET_CATEGORY_BY_ID_API,
    DELETE_CATEGORY_API
} = categoryEndpoints


export function createCategoryApi(data, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
                Authorization: `Bearer ${token}`,
            })

            console.log("CREATE CATEGORY RESPONSE", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success("Category Created Successfully")
            dispatch(addCategory(response?.data?.data))

        } catch (error) {
            console.log("CREATE CATEGORY ERROR", error);
            toast.error("Category Creation Failed")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export async function getAllCategories(token) {

    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_CATEGORIES_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET ALL CATEGORIES RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }
        result = response.data.data
        toast.success("Category Fetched Successfully")

    } catch (error) {
        console.log("GET ALL CATEGORIES ERROR", error);
        toast.error("Category Fetch Failed")
    }
    toast.dismiss(toastId);
    return result;

}

export function updateCategoryApi(id, data, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const url = `${UPDATE_CATEGORY_API}/${id}`;
            const response = await apiConnector("POST", url, data, {
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_CATEGORY RESPONSE", response);
            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success("Category Updated Successfully")
            dispatch(updateCategory(response?.data?.data))

        } catch (error) {
            console.log("UPDATE_CATEGORY API ERROR", error);
            toast.error("Category Update Failed")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export async function getCategoryDetailById(id, token) {
    const  toastId = toast.loading("Loading...")
    let result = null;
    try {
        const url = `${GET_CATEGORY_BY_ID_API}/${id}`
        const response = await apiConnector("GET", url, null, {
            Authorization: `Bearer ${token}`,
        })

        console.log("GET_CATEGORY_BY_ID RESPONSE", response);

        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Category Details fetched Successfully")
        result = response?.data?.data

    } catch (error) {
        console.log("GET_CATEGORY_BY_ID ERROR", error);
        toast.error("Category Details Failed")
    }
    toast.dismiss(toastId);
    return result;
}

export function deleteCategoryById(id, token) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const url = `${DELETE_CATEGORY_API}/${id}`
            const response = await apiConnector("POST", url, null, {
                Authorization: `Bearer ${token}`,
            })

            console.log("DELETE_CATEGORY_BY_ID RESPONSE", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success("Category deleted Successfully")
            dispatch(removeCategory(id))
        } catch (error){
            console.log("DELETE_CATEGORY_API", error)
            toast.error("Error in deleting catgory")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}
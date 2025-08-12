import {subCategoryEndpoints} from "../apis.js";
import {apiConnector} from "../apiconnector.js";
import {toast} from "react-hot-toast";
import {setLoading, addSubCategory, removeSubCategory, updateSubCategory} from "../../slices/subCategorySlice.js";

const {
    CREATE_SUB_CATEGORY_API,
    GET_ALL_SUB_CATEGORIES_API,
    UPDATE_SUB_CATEGORY_API,
    GET_SUB_CATEGORY_BY_ID_API,
    DELETE_SUB_CATEGORY_API
} = subCategoryEndpoints

export function createSubCategoryApi(data, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", CREATE_SUB_CATEGORY_API, data, {
                Authorization: `Bearer ${token}`,
            })
            console.log("CREATE_SUB_CATEGORY_API RESPONSE", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }
            dispatch(addSubCategory(response?.data?.data))
            toast.success("Sub Category Created Successfully")

        } catch (error) {
            console.log("CREATE_SUB_CATEGORY_API error", error);
            toast.error("Could not create sub category")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export async function getAllSubCategories(token) {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("GET", GET_ALL_SUB_CATEGORIES_API, null, {
            Authorization: `Bearer ${token}`,
        })

        console.log("PRINTING GET ALL SUBCATEGORY API ", response)

        if (!response.data.success){
            throw new Error("Error in getting subcategoris")
        }

        toast.success('Subcategories fetched successfully')

        result = response?.data?.data

    } catch (error) {
        console.log("GET ALL SUBCATEGORIES API ERROR", error)
        toast.error("unable to fetch subcategories")
    }
    toast.dismiss(toastId)
    return result
}

export function deleteSubCategoryById(id, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const url = `${DELETE_SUB_CATEGORY_API}/${id}`
            const response = await apiConnector("POST", url, {id}, {
                Authorization: `Bearer ${token}`,
            })
            console.log("DELETE_SUB_CATEGORY_API RESPONSE", response);
            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }
            dispatch(removeSubCategory(id))
            toast.success("Sub Category deleted Successfully")
        } catch (error) {
            console.log("DELETE_SUB_CATEGORY_API", error)
            toast.error("Error in deleting subcategory")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function updateSubCategoryApi(id, data, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const url = `${UPDATE_SUB_CATEGORY_API}/${id}`;
            const response = await apiConnector("POST", url, data, {
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_SUB_CATEGORY_API RESPONSE", response);
            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }
            dispatch(updateSubCategory(response?.data?.data))
            toast.success("Sub Category Updated Successfully")
        } catch (error) {
            console.log("UPDATE_SUB_CATEGORY_API ERROR", error);
            toast.error("Error in updating subcategory")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export async function getSubCategoryDetailById(id, token) {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const url = `${GET_SUB_CATEGORY_BY_ID_API}/${id}`
        const response = await apiConnector("GET", url, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_SUB_CATEGORY_BY_ID_API RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }
        toast.success("Sub Category Details fetched Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("GET_SUB_CATEGORY_BY_ID_API ERROR", error)
        toast.error("Error in fetching subcategory")
    }
    toast.dismiss(toastId)
    return result
}
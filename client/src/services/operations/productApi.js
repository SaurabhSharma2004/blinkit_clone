import {apiConnector} from "../apiconnector.js";
import {toast} from "react-hot-toast";
import {productEndpoints} from "../apis.js";
import {setLoading, removeProduct, addProduct, updateProduct} from "../../slices/productSlice.js";
const {
    CREATE_PRODUCT_API,
    GET_ALL_PRODUCTS_API,
    UPDATE_PRODUCT_BY_ID_API,
    GET_PRODUCT_BY_ID_API,
    DELETE_PRODUCT_BY_ID_API,
    GET_PRODUCT_BY_CATEGORY_ID_API,
    GET_PRODUCT_BY_CATEGORY_AND_SUB_CATEGORY_ID_API
} = productEndpoints


export function createProductApi(data, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
                Authorization: `Bearer ${token}`,
            });

            console.log("CREATE PRODUCT RESPONSE", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success("Product Created Successfully");
            dispatch(addProduct(response?.data?.data));

        } catch (error) {
            console.log("CREATE PRODUCT ERROR", error);
            toast.error("Product Creation Failed");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export async function getAllProducts(data, token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("POST", GET_ALL_PRODUCTS_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET ALL PRODUCTS RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }
        result = response?.data
        toast.success("Products Fetched Successfully");
    } catch (error) {
        console.log("GET ALL PRODUCTS ERROR", error);
        toast.error("Products Fetch Failed");
    }
    toast.dismiss(toastId);
    return result;
}

export async function getProductDetailById(id, token) {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const url = `${GET_PRODUCT_BY_ID_API}/${id}`;
        const response = await apiConnector("GET", url, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("GET PRODUCT BY ID RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }
        toast.success("Product Details Fetched Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("GET PRODUCT BY ID ERROR", error);
        toast.error("Product Details Fetch Failed");
    }
    toast.dismiss(toastId);
    return result;
}

export async function getProductsByCategory(id, token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const url = `${GET_PRODUCT_BY_CATEGORY_ID_API}/${id}`;
        const response = await apiConnector("GET", url, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("GET PRODUCTS BY CATEGORY RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }
        result = response?.data?.data;
    }
    catch (error) {
        console.log("GET PRODUCTS BY CATEGORY ERROR", error);
        toast.error("Products Fetch Failed");
    }
    toast.dismiss(toastId);
    return result;
}

export async function getProductByCategoryAndSubCategoryId(data, token) {
    const toastId = toast.loading("Loading...");
    console.log("printing Data in service", data);
    let result;
    try {
        const response = await apiConnector("POST", GET_PRODUCT_BY_CATEGORY_AND_SUB_CATEGORY_ID_API, data,{
            Authorization: `Bearer ${token}`,
        });
        console.log("GET PRODUCTS BY CATEGORY AND SUB CATEGORY ID RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }
        result = response?.data
    } catch (error) {
        console.log("GET PRODUCTS BY CATEGORY AND SUB CATEGORY ID ERROR", error);
        toast.error("Products Fetch Failed");
    }
    toast.dismiss(toastId);
    return result;
}
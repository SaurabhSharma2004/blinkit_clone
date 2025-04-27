import axios from 'axios'
// import { generateRefreshAccessToken } from './operations/authApi';

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data : bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    })
}


//automatically add the access token to the request headers if it exists in local storage
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem('accessToken')
//         if (accessToken) {
//             config.headers = {
//                 ...config.headers,
//                 Authorization: `Bearer ${accessToken}`,
//             }
//         }
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

// //automatically refresh the access token if it is expired and retry the request
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async (error) => {
//         const originalRequest = error.config

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true
            
//             const refreshToken = localStorage.getItem('refreshToken')

//             if (refreshToken) {
//                 try {
//                     const newAccessToken = await generateRefreshAccessToken(refreshToken)
//                     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//                     return axiosInstance(originalRequest)
//                 } catch (error) {
//                     console.log("Error refreshing access token:", error);
//                 }
//             }
//         }
//         return Promise.reject(error)
//     }
// )
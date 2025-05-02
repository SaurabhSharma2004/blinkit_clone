const baseUrl = 'http://localhost:4000';

export const authEndpoints = {
    SIGNUP_API: `${baseUrl}/api/user/signup`,
    LOGIN_API: `${baseUrl}/api/user/login`,
    FORGOT_PASSWORD_API: `${baseUrl}/api/user/forgot-password`,
    RESET_PASSWORD_API: `${baseUrl}/api/user/reset-password`,
    FORGOT_PASSWORD_OTP_VERIFY_API: `${baseUrl}/api/user/verify-forgot-password-otp`,
    VERIFY_EMAIL_API: `${baseUrl}/api/user/verify-email`,
    REFRESH_TOKEN_API: `${baseUrl}/api/user/refresh-token`,
}

export const profileEndpoints = {
    GET_USER_DETAILS_API: `${baseUrl}/api/user/get-user`,
    UPLOAD_AVATAR_API: `${baseUrl}/api/user/upload-avatar`,
    UPDATE_USER_DETAILS_API: `${baseUrl}/api/user/update-user`,
}

export const categoryEndpoints = {
    CREATE_CATEGORY_API: `${baseUrl}/api/category/create-category`,
    GET_ALL_CATEGORIES_API: `${baseUrl}/api/category/get-all-categories`,
    GET_CATEGORY_BY_ID_API: `${baseUrl}/api/category/get-category-by-id`,
    UPDATE_CATEGORY_API: `${baseUrl}/api/category/update-category`,
    DELETE_CATEGORY_API: `${baseUrl}/api/category/delete-category`,
}

export const subCategoryEndpoints = {
    CREATE_SUB_CATEGORY_API: `${baseUrl}/api/subcategory/create-subcategory`,
    GET_ALL_SUB_CATEGORIES_API: `${baseUrl}/api/subcategory/get-all-subcategories`,
    GET_SUB_CATEGORY_BY_ID_API: `${baseUrl}/api/subcategory/get-subcategory`,
    UPDATE_SUB_CATEGORY_API: `${baseUrl}/api/subcategory/update-subcategory`,
    DELETE_SUB_CATEGORY_API: `${baseUrl}/api/subcategory/delete-subcategory`,
}
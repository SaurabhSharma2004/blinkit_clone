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
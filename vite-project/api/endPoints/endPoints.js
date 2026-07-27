import OtpVerify from "../../src/pages/auth/otpVerify/OtpVerify"

export const EndPoints={
   auth: {
        signUp:"/auth/register",
        signIn: "/auth/login",
        otpVerify: "/auth/verify-otp",
        updatePassword: "/auth/update-password",
        userProfile:"/auth/profile",
        resetPasswordLink:"/auth/reset-password-link",
        resetPassword:"/auth/reset-password/:id/:token"
    },
    product:{
        productList:"/api/post/list",
        productAdd:"/api/post/create",
        updatePost:"/api/post/update/:id",
        getPostById:"/api/post/:id",
        deletePost:"/api/delete/:id"
    },
    admin:{
        adminLogin:"/admin/login",
        adminAuth:"/admin/dashboard"
    }
}


const points=[
    EndPoints.auth.signUp,
    EndPoints.auth.signUp,
    EndPoints.auth.otpVerify
]


// axiosInstance.post(EndPoints.auth.signUp)
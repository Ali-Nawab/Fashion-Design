const apis = () => {
    const local = 'https://backend-server-63pp.onrender.com';

    const list = {
        register: `${local}/api/register`,
        login: `${local}/api/login`,
        forgetPassword: `${local}/api/forget/password`,
        verifyOtp: `${local}/api/verify/otp`,
        getOtpTime: `${local}/api/otp/time`,
        updatePassword: `${local}/api/update/password`,
        getAccess: `${local}/api/getAccess`,
        getProducts: `${local}/api/all/products`,
        getSingleProduct: `${local}/api/all/products/:id`,
        addToCart: `${local}/api/addToCart`,
        clearCart: `${local}/api/clearCart`,
        removeFromCart: `${local}/api/remove/cart`,
        fetchSingleUserCartData: `${local}/api/cart/:userId`,
        getUsers: `${local}/api/get/users`,
        deleteComment: `${local}/api/delete/comment`,
        addComment: `${local}/api/add/comment`,
        orderStatus: `${local}/api/order/status`,
        specificUser: `${local}/api/user`,
        updateSpecificUser: `${local}/api/update/user`,
        purchasedItems: `${local}/api/purchased/items/user`,
        stripePayment: `${local}/api/create-checkout-session`
    }
    return list
}

export default apis;
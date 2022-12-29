export const LoginStart = (userCredentials) => ({
    type:"LOGIN_START"
})

export const LoginSuccess = (userCredentials) => ({
    type:"LOGIN_SUCCESS",
    payload: userCredentials
})

export const LoginFailure = (userCredentials) => ({
    type:"LOGIN_FAILURE",
    payload: error,

})
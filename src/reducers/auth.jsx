// Initilised States
// authError: string
// loading: boolean (default: false)
const initState = {
    authError: null,
    loading: false
}

// authReducer: function
// @params1 state
// @params2 action
// @return [state, authError]
const authReducer = (state = initState, action) => {
    switch (action.type) {
        // type: LOGIN_ERROR
        // @return [state, authError]
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login failed!'
            }
        // type: LOGIN_SUCCESS
        // @return [state, authError]
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            }
        // type: SIGNOUT_SUCCESS
        // @return [state]
        case 'SIGNOUT_SUCCESS':
            return state
        // type: SIGNUP_SUCCESS
        // @return [state, authError]
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        // type: SIGNUP_ERROR
        // @return [state, authError: error message]
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        // default type
        // @return [state]
        default:
            return state
    }
}

export default authReducer
import jwt_decode from "jwt-decode"
const initState = {
    loading: false,
    user: '',
    token: null
}

let token = localStorage.getItem('User_key')
// console.log(token);
const decode_token = (token) => {
    const decoded_token = jwt_decode(token);
    return decoded_token

}

if (token) {
    let { user } = decode_token(token)
    initState.user = user
    initState.token = token
}

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            state.loading = true;
            return { ...state };

        case 'CLOSE_LOADING':
            state.loading = false;
            return { ...state };

        case 'SET_USER':
            state.user = decode_token(action.payload).user
            state.token = action.payload
            return { ...state }

        case 'LOGOUT':
            state.user = ""
            state.token = null
            return { ...state }
        default:
            return state
    }
}
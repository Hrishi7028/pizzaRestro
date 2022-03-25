const initState = {
    AllUsers: [],
    singleUser: {}
}


export const adminuserReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            state.AllUsers = action.payload
            return { ...state }
        default:
            return { ...state }
    }
}

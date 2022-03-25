const initState = {
    msg: ""
}



export const notificationReducer = (state = initState, action) => {

    switch (action.type) {
        case 'SET_MSG':
            state.msg = action.payload;
            return { ...state };

        case 'REMOVE_MSG':
            state.msg = ""
            return { ...state, msg : "" };

        default:
            return state

    }
}
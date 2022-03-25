const initState = {
    allUserOrders: [],
    singleOrder: {}
}

export const UserOrderReducer = (state = initState, action) => {
    switch (action.type) {

        case 'ALL_USER_ORDER':
            state.allUserOrders = action.payload
            return { ...state }

        case 'GET_SINGLE_ORDER_DETAIL':
            state.singleOrder = action.payload
            return { ...state }
        default:
            return { ...state }
    }
}


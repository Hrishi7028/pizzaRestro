const initState = {
    allOrders: []
}

export const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_ORDERS':
            state.allOrders = action.payload
            return { ...state }

        default:
            return state
    }
}
import axios from 'axios'


export const orderAction = (amount, token) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING' })

        const currUser = getState().userReducer.user;
        let cartItems = [];
        cartItems = getState().pizzaReducer.addToCartAllPizza;
        const totalAmount = getState().pizzaReducer.totalPrice;
        const totalQuantity = getState().pizzaReducer.totalQuantity;
        const {userReducer:{token}} = getState();
        
        // console.log(" " + totalAmount + "  " + totalQuantity);
        try {
            const response = await axios.post('/pay', {
                amount,
                token,
                currUser,
                cartItems,
                totalCartAmount: totalAmount,
                totalQuantity
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({ type: 'ClOSE_LOADING' })
            // console.log(response.data.msg);
            dispatch({ type: 'SET_MSG', payload: response.data.msg })


        } catch (error) {
            dispatch({ type: 'ClOSE_LOADING' })
            console.log(error.response);

        }
    }
}

export const getAllOrders = (userId) => {
    return async (dispatch) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get(`/user/allorders/${userId}`);
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'GET_ALL_ORDERS', payload: response.data.allData })
        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' })
            console.log(error.response);
        }
    }
}
import axios from "axios"

export const getALLUserOrders = () => {
    return async (dispatch) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/admin/allUserOrders')
            // console.log(response);
            dispatch({ type: 'ALL_USER_ORDER', payload: response.data.allOrders })
            dispatch({ type: 'CLOSE_LOADING' })

        } catch (error) {
            console.log(error.response);
            dispatch({ type: 'CLOSE_LOADING' })
        }
    }
}

export const singlePizza = (pizza_id) => {
    return async (dispatch) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get(`/single_prod/${pizza_id}`);
            dispatch({ type: 'GET_SINGLE_ORDER_DETAIL', payload: response.data.order })
            dispatch({ type: 'CLOSE_LOADING' })

        } catch (error) {
            console.log(error.response);
            dispatch({ type: 'CLOSE_LOADING' })

        }
    }
}

export const updateOrder = (Order) => {
    return async (dispatch) => {
        dispatch({type:'SET_LOADING'})
        try {
            const response = await axios.put('/admin/update/status/order', Order);
            // console.log(response);
            dispatch({ type: 'SET_MSG', payload: response.data.msg })
            dispatch({type:'CLOSE_LOADING'})
        } catch (error) {
            console.log(error.response);
            
            dispatch({type:'CLOSE_LOADING'})
        }
    }
}
import axios from "axios"



export const getAllPizza = () => {
    return async (dispatch) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.get('/getAll')
            dispatch({ type: 'GET_ALL_PIZZA', payload: response.data.pizza })
            dispatch({ type: "CLOSE_LOADING" })
        } catch (error) {
            console.log(error);
            dispatch({ type: "CLOSE_LOADING" })
        }
    }
}

export const deletePizza = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING' })
        const { userReducer: { token } } = getState();
        try {
            await axios.delete(`/delete_pizza/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log(response.data);
            dispatch({ type: "CLOSE_LOADING" })
        } catch (error) {
            console.log(error);
            dispatch({ type: "CLOSE_LOADING" })
        }
    }
}

export const getPizzaById = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING' })
        const { userReducer: { token } } = getState();
        try {
            const response = await axios.get(`/get_single_pizza/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log(response.data.pizza);
            dispatch({ type: "CLOSE_LOADING" })
        } catch (error) {
            console.log(error.response);
            dispatch({ type: "CLOSE_LOADING" })
        }
    }
}

export const updateThisPizza = (data) => {

    return async (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING' })
        const { userReducer: { token } } = getState();
        console.log(data._id);
        try {
            const response = await axios.put(`/update_details/${data._id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log(response.data);
            dispatch({ type: 'SET_MSG', payload: response.data.msg })
        } catch (error) {
            dispatch({ type: 'SET_MSG', payload: error.response.data.error })
            console.log(error.response);
        }
    }
}

export const addnewPizza = (data) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING' })
        const { userReducer: { token } } = getState();
        try {
            const response = await axios.post(`/create_pizza`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({ type: 'CLOSE_LOADING' })
            // console.log(response.data.msg);
            dispatch({ type: 'SET_MSG', payload: response.data.msg })
        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' })
            console.log(error.response.data);
        }
    }
}
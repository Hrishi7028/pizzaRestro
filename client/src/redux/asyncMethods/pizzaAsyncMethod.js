import axios from 'axios';

export const getAllPizza = () => {
    return async (dispatch) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.get('/getAll')
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'SET_ALL_PIZZA', payload: response.data.pizza })
            // console.log(response.data.pizza);
        } catch (err) {
            dispatch({ type: 'CLOSE_LOADING' })
            console.log(err.response);
            err.response.data.error.map(err => {
                return dispatch({ type: 'SET_MSG', payload: err.msg })
            })
        }
    }
}

export const filterdItems = (searchKey) => {
    return async dispatch => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.get('/getAll')
            console.log(response.data.pizza);
            const filteredResults = response.data.pizza.filter((pizza) => pizza.name.toLowerCase().includes(searchKey.toLowerCase()))
            console.log(filteredResults);
            dispatch({ type: 'SET_ALL_PIZZA', payload: filteredResults })
            // console.log(response.data.pizza);
            dispatch({ type: 'CLOSE_LOADING' })
        } catch (err) {
            dispatch({ type: 'CLOSE_LOADING' })
            console.log(err.response);
            err.response.data.error.map(err => {
                return dispatch({ type: 'SET_MSG', payload: err.msg })
            })
        }
    }
}
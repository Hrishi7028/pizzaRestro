import axios from 'axios'

export const register = (state) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:80/register', state)
            // console.log(response.data.msg);
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'SET_MSG', payload: response.data.msg })
            setTimeout(() => {
                localStorage.setItem('User_key', response.data.token)
                dispatch({ type: 'SET_USER', payload: response.data.token })
            }, 1000)
        } catch (err) {
            dispatch({ type: 'CLOSE_LOADING' })
            console.log(err.response);
            err.response.data.error.map(err => {
                return dispatch({ type: 'SET_MSG', payload: err.msg })
            })

        }
    }
}


export const login = (state) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:80/login', state)
            console.log(response);
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'SET_MSG', payload: response.data.msg })
            setTimeout(() => {
                localStorage.setItem('User_key', response.data.token)
                dispatch({ type: 'SET_USER', payload: response.data.token })
            }, 1000);
        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' })
            console.log(error.response.data);
            error.response.data.error.map(err => {
                return dispatch({ type: 'SET_MSG', payload: err.msg })

            })
        }
    }
}

//forget password sending link to registered email-ID
export const sendLinkToEmail = (email) => {
    return async (dispatch) => {
        console.log(email);
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.post('/forget', { email })
            console.log(response.data.msg);
            response.data.msg.map((smsg) => {
                return dispatch({ type: 'SET_MSG', payload: smsg.msg })
            })
            dispatch({ type: 'CLOSE_LOADING' })
        } catch (error) {
            console.log(error.response);
            error.response.data.error.map((smsg) => {
                return dispatch({ type: 'SET_MSG', payload: smsg.msg })
            })
            dispatch({ type: 'CLOSE_LOADING' })
        }
    }


}

export const changePassword = (password, token, id) => {
    return async (dispatch) => {
        console.log(token);
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.post(`/reset-password/change-new/${id}/${token}`, { password })
            console.log(response.data.msg);
            response.data.msg.map((smsg) => {
                return dispatch({ type: 'SET_MSG', payload: smsg.msg })
            })
            dispatch({ type: 'CLOSE_LOADING' })
        } catch (error) {
            console.log(error);
            error.response.data.error.map((smsg) => {
                return dispatch({ type: 'SET_MSG', payload: smsg.msg })
            })
            dispatch({ type: 'CLOSE_LOADING' })
        }
    }
}





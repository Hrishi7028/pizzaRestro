import axios from "axios"


export const getAllUsers = () => {
    return async (dispatch) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.get('/allusers')
            dispatch({ type: 'GET_ALL_USERS', payload: response.data.users })
            dispatch({ type: "CLOSE_LOADING" })
        } catch (error) {
            console.log(error);
            dispatch({ type: "CLOSE_LOADING" })

        }
    }
}

export const deleteThisUserAsync = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            await axios.delete(`/delete_user/${id}`)
            // console.log(response.data.deletedUser._id);
            dispatch({ type: "CLOSE_LOADING" })
        } catch (error) {
            console.log(error);
            dispatch({type:'SET_MSG',payload:error.response.data.error})
            dispatch({ type: "CLOSE_LOADING" })
        }

    }
}

export const updateUserProfile = (user,id) => {
    return async(dispatch) => {
        // console.log(user,id);
        dispatch({ type: 'SET_LOADING' })
        try {
            const response = await axios.put(`/admin/update_user_profile/${id}`,user)
            // console.log(response.data.msg);
            dispatch({type:'SET_MSG',payload:response.data.msg})
            dispatch({ type: "CLOSE_LOADING" })
        } catch (error) {
            dispatch({ type: "CLOSE_LOADING" })
            dispatch({type:'SET_MSG',payload:error.response.data.error})
            // console.log(error.response.data);
        }
    }
}
const initState = {
    AllPizza: [],
    editPizza: {}
}



export const adminPizzaReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_PIZZA':
            state.AllPizza = action.payload
            return { ...state }

        case 'EDIT_PIZZA':
            let id = action.payload;
            let idx = state.AllPizza.findIndex((pizza) => pizza._id === id)
            // console.log(idx);
            state.editPizza = state.AllPizza[idx];
            console.log(state.editPizza);

            return { ...state }
        default:
            return { ...state }
    }
}



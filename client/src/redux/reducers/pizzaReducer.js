const initState = {
    loading: false,
    allPizza: [],
    addToCartAllPizza: [],
    totalQuantity: 0,
    totalPrice: 0
}


const storeInLocalStorage = (data) => {
    localStorage.setItem('cartPizza', JSON.stringify(data));
}


let cartPizza = localStorage.getItem('cartPizza');
// console.log(cartPizza);

if (cartPizza) {
    let data = localStorage.getItem('cartPizza')
    let fData = JSON.parse(data);
    console.log(fData);
    initState.addToCartAllPizza = fData.addTCart
    initState.totalQuantity = fData.tQuantity
    initState.totalPrice = fData.tPrice
}

export const pizzaReducer = (state = initState, action) => {
    let id, index
    let pizzaTy
    let cart = localStorage.getItem('cartPizza')
    if (cart !== null) {
        var { addTCart, tPrice, tQuantity } = JSON.parse(cart);
    }
    switch (action.type) {
        case 'SET_LOADING':
            state.loading = true;
            return { ...state };

        case 'CLOSE_LOADING':
            state.loading = false;
            return { ...state };

        case 'ADD_TO_CART':
            let { _id, quantity, price, pizzaType } = action.payload
            let isCheck = state.addToCartAllPizza.find((prod) => prod._id === _id)
            let isCheckType = state.addToCartAllPizza.find((prod) => prod.pizzaType === pizzaType && prod._id === _id)
            //if they are diffrent but id && pizza type
            console.log(isCheckType);
            if (isCheck === undefined || isCheckType === undefined) {
                state.totalQuantity += quantity
                state.totalPrice += (price * quantity)
                let cart = {
                    addTCart: [...state.addToCartAllPizza, action.payload],
                    tQuantity: state.totalQuantity,
                    tPrice: state.totalPrice
                }
                storeInLocalStorage(cart);
                return { ...state, addToCartAllPizza: [...state.addToCartAllPizza, action.payload] }
            } else {
                // if item is same ...
                let idx = state.addToCartAllPizza.findIndex((prod) => prod._id === _id && prod.pizzaType === pizzaType)
                console.log(idx);
                if (idx !== -1) {
                    state.addToCartAllPizza[idx].quantity += action.payload.quantity
                    state.totalQuantity += action.payload.quantity;
                    state.totalPrice += (action.payload.price * action.payload.quantity)

                    // updating in localStorage
                    addTCart[idx].quantity += action.payload.quantity;
                    tPrice += (action.payload.price * action.payload.quantity)
                    tQuantity += action.payload.quantity
                    cart = { addTCart, tPrice, tQuantity }
                    storeInLocalStorage(cart);
                }

                return { ...state }

            }

        case 'INC':
            console.log(action.payload);
            id = action.payload.id;
            pizzaTy = action.payload.pizzaType;
            index = state.addToCartAllPizza.findIndex((pro) => pro._id === id && pro.pizzaType === pizzaTy)
            state.addToCartAllPizza[index].quantity += 1
            state.totalQuantity += 1 //made changes
            state.totalPrice += state.addToCartAllPizza[index].price // made changes

            //updating in localstorage...
            cart = localStorage.getItem('cartPizza')
            addTCart[index].quantity = 1 + state.addToCartAllPizza[index].quantity;
            tPrice += state.addToCartAllPizza[index].price
            tQuantity += 1
            cart = { addTCart, tPrice, tQuantity }
            storeInLocalStorage(cart);
            return { ...state }

        case 'Dec':
            id = action.payload.id;
            pizzaTy = action.payload.pizzaType;
            index = state.addToCartAllPizza.findIndex((pro) => pro._id === id && pro.pizzaType === pizzaTy)
            state.addToCartAllPizza[index].quantity = state.addToCartAllPizza[index].quantity - 1
            state.totalQuantity = state.totalQuantity - 1
            state.totalPrice = state.totalPrice - state.addToCartAllPizza[index].price
            //updating in localstorage...
            addTCart[index].quantity -= 1;
            tPrice -= state.addToCartAllPizza[index].price
            tQuantity -= 1
            cart = { addTCart, tPrice, tQuantity }
            storeInLocalStorage(cart);
            return { ...state }

        case 'DELETE':
            id = action.payload.id;
            console.log(action.payload);
            pizzaTy = action.payload.pizzaType;
            index = state.addToCartAllPizza.findIndex((pro) => pro._id === id && pro.pizzaType === pizzaTy)
            console.log(index);
            if (index > -1) {  // if index is greater than 0 then index is valid for deletion... 

                // updating in localstorage...
                tQuantity -= state.addToCartAllPizza[index].quantity
                tPrice = tPrice - (state.addToCartAllPizza[index].price * state.addToCartAllPizza[index].quantity);
                addTCart.splice(index, 1);
                cart = { addTCart, tPrice, tQuantity }
                storeInLocalStorage(cart);


                state.totalQuantity = state.totalQuantity - state.addToCartAllPizza[index].quantity
                state.totalPrice = state.totalPrice - (state.addToCartAllPizza[index].price * state.addToCartAllPizza[index].quantity);
                // now we have that index and now we are removing that index using splice...
                state.addToCartAllPizza.splice(index, 1);
            }
            return { ...state }

        case 'SET_ALL_PIZZA':
            state.allPizza = action.payload
            return { ...state }

        case 'REMOVE_CART':
            state.addToCartAllPizza.splice(0, state.addToCartAllPizza.length);
            state.totalQuantity = 0;
            state.totalPrice = 0;
            return { ...state }
        default:
            return state

    }
}
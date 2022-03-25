import { combineReducers, createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { pizzaReducer } from './reducers/pizzaReducer'
import { userReducer } from './reducers/userReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { adminuserReducer } from './reducers/AdminReducers/adminuserReducer'
import { adminPizzaReducer } from './reducers/AdminReducers/adminPizzaReducer'
import { UserOrderReducer } from './reducers/AdminReducers/AllUserOrders'
import { OrderReducer } from './reducers/OrderReducer'


const rootReducer = combineReducers({
    pizzaReducer,
    userReducer,
    notificationReducer,
    adminuserReducer,
    adminPizzaReducer,
    OrderReducer,
    UserOrderReducer
})

const middlewares = [reduxThunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
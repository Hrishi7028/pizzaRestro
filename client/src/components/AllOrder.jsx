import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'wc-toast';
import { getAllOrders } from '../redux/asyncMethods/OrderAction';
import OrderCart from './OrderCart';
import Emptycart from './Emptycart'
import HashLoader from "react-spinners/HashLoader";
import '../Styles/Loader.css'

const AllOrder = () => {
    const { user } = useSelector(state => state.userReducer)
    const { msg } = useSelector(state => state.notificationReducer);
    const dispatch = useDispatch()
    const { allOrders } = useSelector(state => state.OrderReducer)
    const { loading } = useSelector(state => state.pizzaReducer)


    useEffect(() => {
        dispatch(getAllOrders(user._id))
        if (msg.length > 0) {
            toast.success(msg);
            localStorage.removeItem('cartPizza')
            dispatch({ type: 'REMOVE_CART' })
            dispatch({ type: 'REMOVE_MSG' })
        }
    }, [msg, dispatch, user._id]);

    return <div>
        <wc-toast></wc-toast>
        {
            !loading ? (
                <div className="container" style={{ marginTop: '6rem' }}>
                    {
                        allOrders.length > 0 ? allOrders.map((card,idx) => (
                            <OrderCart
                            key={idx}
                                card={card}
                            />
                        )) :
                            <Emptycart />
                    }
                </div>
            ) :
                (
                    <div className='loader'>
                            <HashLoader size={150} />
                        </div>
                )
        }
    </div>;
};

export default AllOrder;

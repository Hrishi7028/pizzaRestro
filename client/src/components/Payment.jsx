import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'
import { orderAction } from '../redux/asyncMethods/OrderAction';



const Payment = ({ amount }) => {

    const dispatch = useDispatch()
    const { msg } = useSelector((state) => state.notificationReducer)
    const history = useHistory()
    const tokenHandler = (token) => {
        dispatch(orderAction(amount, token))
    }

    useEffect(() => {
        if (msg.length > 0) {
            history.push('/all_your_orders/id')
        }
    }, [history,msg]);


    console.log('Payment component has called');
    return (
        <div>
            <wc-toast></wc-toast>
            <StripeCheckout className='mt-2 mb-2 btn text-capitalize'
                stripeKey='pk_test_51IBdyTKB7MksyiLehZoCO40MgsglnLsgiNK4yNd76K5k67Nv9KRIvm0L2hvC5Prk2yvuQrGfWbnUfsWs9FT2xyas00nmK2xIqi'
                token={tokenHandler}
                amount={amount * 100}
                currency='INR'
            />
        </div>)
};

export default Payment;

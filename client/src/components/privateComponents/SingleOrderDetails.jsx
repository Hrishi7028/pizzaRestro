import React, { useEffect, useState } from 'react';
import { Card, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singlePizza, updateOrder } from '../../redux/asyncMethods/AdminMethods/OrderAsyncMethods';
import "../../Styles/AllUserOrderCard.css"
import { toast } from 'wc-toast';

const SingleOrderDetails = () => {
    let { id } = useParams()
    const dispatch = useDispatch()
    const { singleOrder, singleOrder: { cartItems }, loading } = useSelector(state => state.UserOrderReducer)
    const [orderStatus, setOrderStatus] = useState(singleOrder.isDelived !== undefined ? singleOrder.isDelived : '');
    const { msg } = useSelector(state => state.notificationReducer)

    // this hook is used for fetching the all orders
    useEffect(() => {
        dispatch(singlePizza(id))
    }, [dispatch, id]);

    // this hook is used for updating the status of order or for notification order status changing
    useEffect(() => {
        setOrderStatus(loading === true ? 'wait' : (singleOrder.isDelived !== undefined ? singleOrder.isDelived : ''));
        if (msg.length > 0) {
            toast.success(msg);
            dispatch({ type: 'REMOVE_MSG' })
        }
    }, [loading, singleOrder.isDelived, dispatch, msg.length, msg, singleOrder.shippinAddress])

    // FOr changing the order status (select box onChangeEvent)
    const handelOrderStatus = (e) => {
        setOrderStatus(e.target.value);
        singleOrder.isDelived = e.target.value
        dispatch(updateOrder(singleOrder))
    }

    // console.log(singleOrder);

    return (
        <>
            {
                loading ? (
                    <div style={{ marginTop: '6rem' }}>
                        <Spinner animation="border" />
                    </div>
                ) :
                    (
                        <div className="container" style={{ marginTop: '6rem' }}>
                            <h3>Single order details...</h3>
                            <hr />
                            <wc-toast></wc-toast>
                            <div className="card_container">
                                <Card>
                                    <Card.Header className='custome_header'>
                                        <div className="user_details">
                                            <div className='User_name'><span>Name: </span> {singleOrder.name}</div>
                                            <div className="User_name"><span>Email:</span> s.a.rushkesh@gmail.com</div>
                                        </div>

                                        <div className="address_container">
                                            <span className='user_adetails'>Address:</span> {singleOrder.shippinAddress}
                                        </div>
                                        <div className='order_select_box'>
                                            <select value={orderStatus} onChange={handelOrderStatus}>
                                                <option value="Ordered">Ordered</option>
                                                <option value="Preparing">Preparing</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="order_details">
                                            <div className="img_container">
                                                <Image
                                                    src="/logo192.png"
                                                />
                                            </div>
                                            <div className="pizza_details_container">

                                                <div className="detail_info">
                                                    {
                                                        cartItems !== undefined ? (
                                                            singleOrder.cartItems.map((card, idx) => (
                                                                <Card
                                                                    key={idx}
                                                                    text='black'
                                                                    className="mb-2 mx-3 custome_card"
                                                                >

                                                                    <Card.Body>
                                                                        <Card.Title className='pizz_header'>
                                                                            <span>{card.name}</span>
                                                                        </Card.Title>
                                                                        <hr />
                                                                        <Card.Text>
                                                                            <span>
                                                                                <span className='PizzaContainer'>
                                                                                    <span>Total Quantity -</span>
                                                                                    <span>{card.quantity}</span>
                                                                                </span>
                                                                                <span className='PizzaContainer'>
                                                                                    <span>Pizza Type -</span>
                                                                                    <span>{card.pizzaType}</span>
                                                                                </span>
                                                                            </span>
                                                                        </Card.Text>
                                                                    </Card.Body>
                                                                </Card>
                                                            ))
                                                        ) :
                                                            (
                                                                <div>
                                                                    <Spinner animation="border" />
                                                                </div>
                                                            )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )
            }
        </>
    )
};


export default SingleOrderDetails;




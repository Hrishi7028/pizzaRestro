import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import '../Styles/CartScreen.css'
import Payment from './Payment'


const PaymentSection = () => {
    const { totalPrice, totalQuantity } = useSelector(state => state.pizzaReducer)

    let deliveryCharges = totalPrice > 1000 ? 0 : 49




    return (
        <div>
            <Card>
                <Card.Header as="h4">Total</Card.Header>
                <Card.Body>
                    <div className="Payment_box">
                        <span>Total Quantity:</span>
                        <span>{totalQuantity}</span>
                    </div>
                    <div className="Payment_box">
                        <span>Total Price:</span>
                        <span>{totalPrice}</span>
                    </div>
                    <div className="Payment_box">
                        <span>Delivery Charges:</span>
                        <span>{deliveryCharges}</span>
                    </div>
                    <hr />
                    <div className="Payment_box">
                        <span style={{ fontWeight: 'bold' }}>Total:</span>
                        <span style={{ fontWeight: 'bold' }}>{totalPrice + deliveryCharges}</span>
                    </div>
                    <div>
                        <Payment
                            amount={totalPrice + deliveryCharges}
                        />
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PaymentSection

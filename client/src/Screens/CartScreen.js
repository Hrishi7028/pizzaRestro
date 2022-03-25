import React from 'react'
import { useSelector } from 'react-redux'
import CartTable from '../components/CartTable'
import Emptycart from '../components/Emptycart'
import { Row, Col } from 'react-bootstrap'
import PaymentSection from '../components/PaymentSection'

const CartScreen = () => {
    const { addToCartAllPizza } = useSelector(state => state.pizzaReducer)
    return (
        <div className="container" style={{ marginTop: '6rem' }}>
            <div className='mt-5'>
                {
                    addToCartAllPizza.length === 0 ? <Emptycart /> :
                        <div className="container">
                            <h2>Your Bag is here...</h2>
                            <hr />
                            <Row>
                                <Col sm={12} xs={12} md={8}>
                                    <CartTable />
                                </Col>
                                <Col sm={12} xs={12} md={4}>
                                    <PaymentSection />
                                </Col>
                            </Row>
                        </div>
                }
            </div>
        </div>
    )
}

export default CartScreen

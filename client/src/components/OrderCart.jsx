import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap'
import '../Styles/OrderCart.css'


const OrderCart = ({ card }) => {
    
    return (
        <>
            <div className="container" style={{ marginTop: '15px' }}>
                <Card className='card_box'>
                    {/* dont use map here */}
                    <Card.Header className='card_header'>

                        <div className='card_header_item'>
                            <div>Ordered Placed At:</div>
                            <div>{card.updatedAt.substring(0,10)}</div>
                        </div>
                        <div className='card_header_item'>
                            <div>Total Quantity:</div>
                            <div>{card.totalQuantity}</div>
                        </div>
                        <div className='card_header_item'>
                            <div>Total Price:</div>
                            <div>{card.OrderAmount}</div>
                        </div>
                        <div className='card_header_item'>
                            <div>Status:</div>
                            <div style={{ backgroundColor: 'white', fontWeight: 'bold' }}>{card.isDelived}</div>
                        </div>
                    </Card.Header>
                    {/* end of header */}
                    {
                        card.cartItems.map((item,idx) => (
                            <Row style={{ margin: '7px 0px' }} key={idx}>
                                <Col md={3} className='my-auto'>
                                    <div className="img_div px-2">
                                        <Image src="/logo192.png" rounded fluid style={{ height: '180px' }} />
                                    </div>
                                </Col>
                                <Col md={9} className='pizza_content'>
                                    <Card.Body>
                                        <Card.Title className='card_title'>{item.name}</Card.Title>
                                        <div>
                                            <div className="quantity">
                                                <span>Quantity: </span>
                                                <span>{item.quantity}</span>
                                            </div>
                                            <div className="pizza_type">
                                                <span>Pizza Type: </span>
                                                <span>{item.pizzaType}</span>
                                            </div>
                                            <div className="price">
                                                <span>Price: </span>
                                                <span>{item.price}</span>
                                            </div>
                                            <div className="delivery_address">
                                                <span>Address:</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        ))
                    }
                </Card>
            </div>
        </>
    )
};


export default OrderCart;

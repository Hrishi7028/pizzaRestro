import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import '../Styles/Pizza_Card.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'wc-toast';
import { useHistory } from 'react-router-dom'

const PizzaCars = ({ pizza }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [count] = useState(1)
    const { user } = useSelector(state => state.userReducer)
    const [pizzaType, setPizzaType] = useState("small")

    const { addToCartAllPizza } = useSelector((state) => state.pizzaReducer)


    const addToCart = () => {
        if (!user) {
            toast.error('please Login to Order the Pizza...');
            setTimeout(() => {

                history.push('/login')
            }, 1200);
            dispatch({ type: 'REMOVE_MSG' })
            return;
        }
        let pizzaData = {
        }
        pizzaData.name = pizza.name
        pizzaData._id = pizza._id
        pizzaData.quantity = count
        pizzaData.price = count * pizza.prices[0][pizzaType];
        pizzaData.pizzaType = pizzaType
        const isCheck = addToCartAllPizza.find((prod) => prod._id === pizzaData._id)
        // console.log(isCheck);
        if (isCheck === undefined) {
            dispatch({ type: 'SET_MSG', payload: "Product Added to Cart successfully!!" })
        } else {
            dispatch({ type: 'SET_MSG', payload: "You are adding same items..." })
        }

        dispatch({ type: 'ADD_TO_CART', payload: pizzaData })
    }



    const handleDropdownChange = (e) => {
        setPizzaType(e.target.value)
    }

    return (
        <>
            <Card className="shadow p-3 mb-5 bg-white rounded" style={{ border: "none" }} key={pizza._id} >
                <Card.Img variant="top" className='card_img' src={pizza.image ? pizza.image : "/images/IndianTandooriChickenTikka.jpg"} />
                <Card.Body>
                    <wc-toast></wc-toast>
                    <Card.Title>{pizza.name}</Card.Title>
                    <div>
                        <div className='pizzaSelection'>
                            <div>
                                <select name="" id="" className='pizza_SelectBox' onChange={handleDropdownChange}>
                                    {
                                        pizza.varients.map((pizzaType, idx) => (
                                            <option key={idx} value={pizzaType}>{pizzaType}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            <div className="prize">
                                <span>{pizza.prices[0][pizzaType]}</span>
                            </div>
                        </div>
                        <div className='pizzaSelection'>
                            <div className=" mt-3">
                                <span>Pizza Type: </span>
                            </div>
                            <div className="prize mt-3">
                                <span>{pizza.category}</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="primary" className="text-capitalize mt-3" onClick={addToCart}>Add to cart</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default PizzaCars;
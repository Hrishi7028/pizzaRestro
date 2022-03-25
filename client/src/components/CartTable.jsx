import React from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import { Button } from 'react-bootstrap'
import '../Styles/CartScreen.css'


const CartTable = () => {

    const dispatch = useDispatch()
    const { addToCartAllPizza } = useSelector(state => state.pizzaReducer)

    const IncrementFunction = (id, pizzaType) => {
        // console.log(id);
        dispatch({ type: 'INC', payload: { id, pizzaType } })
    }

    const DecrementFunction = (id, pizza, pizzaType) => {
        // console.log(id);
        // console.log(pizza);
        if (pizza.quantity === 1) {
            return null
        } else {
            dispatch({ type: 'Dec', payload: { id, pizzaType } })
        }
    }

    const deleteThis = (id, pizzaType) => {
        dispatch({ type: 'DELETE', payload: { id, pizzaType } })
    }

    return (
        <div >

            {
                addToCartAllPizza.length > 0 ? (
                    <Table bordered hover responsive style={{ borderRadius: '5px' }} className='text-center' >
                        <thead>
                            <tr>
                                <th>SrNo:</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>PizzaType</th>
                                <th>Quantity</th>
                                <th>Price/Pizza</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                addToCartAllPizza.map((pizza, idx) => {

                                    return (
                                        < tr key={idx}>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}><span>{idx + 1}</span></td>
                                            <td><img src="/logo192.png" alt='no img' height='80px' style={{ borderRadius: '10px' }} /></td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}> <span>{pizza.name}</span> </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}> <span>{pizza.pizzaType}</span> </td>
                                            <td>
                                                <div className='pizza_Quantity_selection_Container mt-3'>
                                                    <span className="pizza_Quantity_selection inc" onClick={() => IncrementFunction(pizza._id, pizza.pizzaType)}><Button className='btn'><AiOutlinePlus /></Button></span>
                                                    <span className="pizza_Quantity_selection num">{pizza.quantity}</span>
                                                    <span className="pizza_Quantity_selection dec" onClick={() => { DecrementFunction(pizza._id, pizza, pizza.pizzaType) }}><Button className='btn' >< AiOutlineMinus /></Button></span>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}><span>{pizza.price}</span></td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}><span onClick={() => deleteThis(pizza._id, pizza.pizzaType)}><AiOutlineDelete style={{ fontSize: '2rem', color: 'red', cursor: 'pointer' }} /></span></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                ) : 'loading....'
            }
        </div >
    )
}

export default CartTable



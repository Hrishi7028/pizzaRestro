import React, { useState } from 'react'
import '../../Styles/Pizza_Card.css'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import '../../Styles/PizzaTable.css'
import { useDispatch } from 'react-redux'
import { deletePizza } from '../../redux/asyncMethods/AdminMethods/PizzaAsyncMethods'
import { useHistory } from "react-router-dom";

const PizzaTable = ({ pizza, idx }) => {
    const [varient, setVarient] = useState('small')
    const dispatch = useDispatch()
    const history = useHistory();
    const deleteThisPizza = (id) => {
        const ans = window.confirm("Do You really want to delete this Product?")
        if (!ans) {
            return;
        }
        dispatch(deletePizza(id))
        window.location.reload();
    }

    const editThisPizza = (id) => {
        dispatch({ type: 'EDIT_PIZZA', payload: id })
        history.push('/admin/edit_pizza');
    }


    const handelItems = (e) => {
        setVarient(e.target.value)
    }

    return (
        <>
            <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                    <img src="/logo192.png" alt="logo" height="75px" />
                </td>
                <td>{pizza.name}</td>
                <td>
                    <select onChange={handelItems} className='pizza_SelectBox'>
                        {
                            pizza.varients.map((item,idx) => (
                                <option key={idx} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </td>
                <td className='prize'>{pizza.prices[0][varient]}</td>
                <td>{pizza.category}</td>
                <td>
                    <div className='pizzaAction'>
                        <span className='editSpan' onClick={() => { editThisPizza(pizza._id) }}><FaRegEdit /></span>
                        <span className='deleteSpan' onClick={() => { deleteThisPizza(pizza._id) }}><AiOutlineDelete /></span>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default PizzaTable

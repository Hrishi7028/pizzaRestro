import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPizza } from '../../redux/asyncMethods/AdminMethods/PizzaAsyncMethods'
import PizzaTable from './PizzaTable'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import HashLoader from "react-spinners/HashLoader";
import '../../Styles/AllPizza.css'

const AllPizza = () => {


    const dispatch = useDispatch()
    const { AllPizza } = useSelector(state => state.adminPizzaReducer)
    const { loading } = useSelector(state => state.userReducer)
    useEffect(() => {
        dispatch(getAllPizza())

    }, [dispatch])
    return (
        <div className='container' style={{ marginTop: '7rem' }}>
            <div className="heading d-flex justify-content-between align-items-center flex-wrap">
                <h2>Get All Details of Pizzas...</h2>
                <Link className='btn w-25 cutome_btn' variant="primary" style={{ border: '1px solid green', cursor: 'pointer', color: 'green' }} to='/admin/new_pizza'><AiOutlinePlus style={{ marginRight: '5px', verticalAlign: 'center' }} />Add New Pizza</Link>
            </div>

            <hr />

           { 
           !loading ?
            (<Table striped bordered hover responsive='sm' style={{ textAlign: 'center', verticalAlign: 'baseline' }}>
                <thead>
                    <tr>
                        <th>sr no</th>
                        <th>Pizza Photo</th>
                        <th>Name</th>
                        <th>Varient</th>
                        <th>Prices</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        AllPizza.map((pizza, idx) => (
                            <PizzaTable
                                key={idx}
                                pizza={pizza}
                                idx={idx}
                            />
                        ))
                    }


                </tbody>
            </Table>) :
            ( <div className="loader">
                <HashLoader size={150} />
            </div>)
            }
        </div>
    )
}

export default AllPizza

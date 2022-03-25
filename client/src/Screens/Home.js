import React, { useEffect } from 'react'
import Slider from '../components/Slider'
import { Container, Row, Col } from 'react-bootstrap'
import PizzaCars from '../components/PizzaCars'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPizza } from '../redux/asyncMethods/pizzaAsyncMethod';
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'wc-toast';


const Home = () => {
    const dispatch = useDispatch()
    const { loading, allPizza } = useSelector(state => state.pizzaReducer)
    const { msg } = useSelector(state => state.notificationReducer);


    useEffect(() => {
        dispatch(getAllPizza());
    }, [dispatch])


    useEffect(() => {
        if (msg !== '') {
            if (msg === 'Product Added to Cart') {
                toast.success(msg);
                dispatch({ type: 'REMOVE_MSG' })
            } else if (msg.includes('token') || msg.includes('Invalid')) {
                toast.error(msg);
            }
            else {
                toast.success(msg);
            }
            dispatch({ type: 'REMOVE_MSG' })
        }
    }, [dispatch, msg]);



    return (
        <div>
            <Slider />
            <Container className="mt-4">
                <h3 className='text-center' style={{fontFamily:'Noto Serif, serif'}}>{loading === true ?  '' : allPizza.length > 0 ? 'All Types of pizzas are here...': 'Sorry Not Found'}</h3>
                <wc-toast></wc-toast>
                <hr />
                {
                    !loading ? (
                        <Row>

                            {
                                allPizza.length > 0 ?
                                    allPizza.map((pizza) => (
                                        <Col sm={6} xs={12} md={4} className="mt-4" key={pizza._id}>
                                            <PizzaCars
                                                pizza={pizza}
                                            />
                                        </Col>
                                    ))
                                    :
                                    <div className='d-flex justify-content-center'>
                                        <div>
                                            <img src={'/images/not_found.png'} alt="" />
                                        </div>
                                    </div>


                            }
                        </Row>

                    ) : (
                        <div className="loader">
                            <HashLoader size={150} />
                        </div>
                    )
                }

            </Container>
        </div>
    )
}

export default Home

import React from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getALLUserOrders } from '../../redux/asyncMethods/AdminMethods/OrderAsyncMethods';
import AllUserOrderCard from './AllUserOrderCard';
import HashLoader from "react-spinners/HashLoader";

const AllUserOrders = () => {

    const { loading } = useSelector(state => state.userReducer)
    const { allUserOrders } = useSelector(state => state.UserOrderReducer)
    // console.log(allUserOrders);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getALLUserOrders())
    }, [dispatch]);

    return (
        <>
            <div className="container" style={{ marginTop: '6rem' }}>
                {
                    !loading ?
                        (
                            <Table striped bordered hover responsive='sm' className='text-center'>
                                <thead>
                                    <tr>
                                        <th>sr.No</th>
                                        <th>Customer Name</th>
                                        <th>Email id</th>
                                        <th>Mobile Number</th>
                                        <th>Total Quantity</th>
                                        <th>Order Date</th>
                                        <th>Delivery Charges</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUserOrders.map((order, idx) => (
                                            <AllUserOrderCard
                                                key={idx}
                                                order={order}
                                                idx={idx}
                                            />

                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
                        :
                        (
                            <div className="loader">
                                <HashLoader size={150} />
                            </div>
                        )
                }
            </div>
        </>);
};

export default AllUserOrders;

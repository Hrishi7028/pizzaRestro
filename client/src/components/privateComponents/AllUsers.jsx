import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/asyncMethods/AdminMethods/UsersAysncMethods'
import { toast } from 'wc-toast';
import HashLoader from "react-spinners/HashLoader";
import SingleUserComp from './SingleUserComp'

const AllUsers = () => {

    const dispatch = useDispatch()
    const { AllUsers } = useSelector(state => state.adminuserReducer)
    const { loading } = useSelector(state => state.userReducer)
    const { msg } = useSelector(state => state.notificationReducer);
    // console.log(msg);
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    useEffect(() => {
        if (msg.length > 0 && msg.includes('updated Successfully')) {
            toast.success(msg);
            dispatch({ type: 'REMOVE_MSG' })
        }
        else if (msg.length > 0) {
            toast.error(msg);
            dispatch({ type: 'REMOVE_MSG' })
        }
    }, [dispatch, msg])

    return (
        <div className='container' style={{ marginTop: '7rem', textAlign: 'center' }}>
            <h2>All users are here...</h2>
            <hr />
            <wc-toast></wc-toast>
            {
                !loading ?
                    (
                        <div>
                            <Table striped bordered hover responsive='sm' style={{ textAlign: 'center', verticalAlign: 'baseline' }}>
                                <thead>
                                    <tr >
                                        <th>sr. no</th>
                                        <th>Full Name</th>
                                        <th>Address</th>
                                        <th>Mobile No:</th>
                                        <th>Role</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        AllUsers.map((userDetails, idx) => (
                                            
                                                <SingleUserComp
                                                    key={idx}
                                                    idx={idx}
                                                    userDetails={userDetails}
                                                />


                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    ) :
                    (<div className="loader">
                        <HashLoader size={150} />
                    </div>)
            }
        </div>
    )
}

export default AllUsers
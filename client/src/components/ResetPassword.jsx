import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'wc-toast'
import { changePassword } from '../redux/asyncMethods/userAsyncMethods'

const ResetPassword = () => {
    const { userId, token } = useParams()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.pizzaReducer)
    const { msg } = useSelector(state => state.notificationReducer)
    const [state, setState] = useState({
        password: '',
        cpassword: ''
    })

    console.log(msg);
    useEffect(() => {
        if (msg !== '' && msg.includes('Expired')) {
            toast.error(msg);
            dispatch({ type: 'REMOVE_MSG' })
            setTimeout(() => {
                window.close();
            }, 4050);
        } else if (msg !== '' && msg.includes('than 5 character')) {
            toast.error(msg);
            dispatch({ type: 'REMOVE_MSG' })
        } else if (msg !== '') {
            toast.success(msg);
            setTimeout(() => {
                window.close();
            }, 2000);
            dispatch({ type: 'REMOVE_MSG' })
        }
    }, [msg, dispatch])


    const submitForm = e => {
        e.preventDefault();
        if (state.password.length === 0 || state.password !== state.cpassword) {
            toast.error('Password Not Matching Retry')
            return
        }
        dispatch(changePassword(state.password, token, userId))
        // console.log(state);
    }

    const handelChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="container" style={{ marginTop: '10rem' }}>
                <div className='w-50 mx-auto'>
                    <h2 className='text-capitalize'>Reset password for your Account...</h2>
                    <hr />
                    <wc-toast></wc-toast>
                    <Form>
                        <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1" >
                            <Form.Control
                                type="text"
                                value={userId}
                                disabled
                                placeholder="Enter new password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1" >
                            <Form.Control
                                onChange={handelChange}
                                type="password"
                                name='password'
                                value={state.password}
                                placeholder="Enter new password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1" >
                            <Form.Control
                                onChange={handelChange}
                                type="password"
                                name='cpassword'
                                value={state.cpassword}
                                placeholder="Confirm Password"
                            />
                        </Form.Group>
                        <Button type='submit' onClick={(e) => submitForm(e)}>{loading ? 'Wait...' : 'Confirm'}</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
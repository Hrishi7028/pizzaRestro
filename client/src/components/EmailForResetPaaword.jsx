import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { sendLinkToEmail } from '../redux/asyncMethods/userAsyncMethods';
import { toast } from 'wc-toast';
import { useHistory } from 'react-router-dom';
const EmailForResetPaaword = () => {
    const [email, setEmail] = useState('');
    const { loading } = useSelector(state => state.pizzaReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    const { msg } = useSelector(state => state.notificationReducer)
    console.log(msg);
    useEffect(() => {
        if (msg !== '' & msg.includes('Successfully...')) {
            toast.success(msg);
            dispatch({ type: 'REMOVE_MSG' })
            setTimeout(() => {
                history.push('/')

            }, 1000);
        } else if (msg !== '') {
            toast.error(msg);
            dispatch({ type: 'REMOVE_MSG' })
        }
    }, [msg, dispatch, history])

    

    const submitForm = (e) => {
        e.preventDefault();
        // console.log(email);
        if (email === '') {
            toast.error('Please Enter Your Email Id');
            return;
        }
        dispatch(sendLinkToEmail(email))
    }
    return (
        <>
            <div className="container" style={{ marginTop: '6rem' }}>
                <div className="form_container w-50 mx-auto" >
                    <wc-toast></wc-toast>
                    <Form autoComplete="off">
                        <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1">
                            <Form.Label>enter email address</Form.Label>
                            <Form.Control
                                onChange={(e) => { setEmail(e.target.value) }}
                                value={email}
                                type="email"
                                name='email'
                                placeholder="Enter Your email address"
                            />
                        </Form.Group>
                        <Button type='submit' onClick={submitForm}>{loading ? 'Loading...' : 'Send Link'}</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}



export default EmailForResetPaaword
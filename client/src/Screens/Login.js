import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/asyncMethods/userAsyncMethods'
import { toast } from 'wc-toast';
import { Link, useHistory } from "react-router-dom";
import '../Styles/Login.css'


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const st = useSelector(s => s.notificationReducer)
    const { loading } = useSelector(stat => stat.userReducer)
    const [state, setState] = useState({
        email: '',
        password: ''
    })


    useEffect(() => {
        if (st.msg !== '') {
            if (st.msg === 'Logged in Successfully!!') {
                toast.success(st.msg);
            } else {
                toast.error(st.msg);
            }

        }
        dispatch({ type: 'REMOVE_MSG' })
    }, [st.msg, dispatch, history])



    const formSubmit = (e) => {
        dispatch({ type: 'SET_LOADING' })
        e.preventDefault()
        dispatch(login(state))
    }

    const handelForm = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container" style={{ marginTop: '8rem' }}>
            <div className='mt-5 w-50 mx-auto ' >
                <wc-toast></wc-toast>
                <h3 className='text-center'>Login Here...</h3>
                <hr />
                <Form autoComplete="off">

                    <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1">
                        <Form.Label>enter email address</Form.Label>
                        <Form.Control
                            onChange={handelForm}
                            value={state.email}
                            type="email"
                            name='email'
                            placeholder="Enter Your email address" />
                    </Form.Group>

                    <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1">
                        <Form.Label>enter password</Form.Label>
                        <Form.Control
                            onChange={handelForm}
                            value={state.password}
                            type="password"
                            name='password'
                            placeholder="●●●●●●●●●●" />
                    </Form.Group>
                    <Button type='submit' onClick={formSubmit}>{!loading ? 'Login' : 'loading...'}</Button>
                </Form>
                <div className="footer">
                    <div className="forgetPassword_section">
                        <Link to='/reset_passs_email_check' className='Forgetpassword_link'>forget password ?</Link>
                        <Link to='/register' className='signup_link'>Sign up ?</Link>
                    </div>
                    <div className='login_footer_text'>
                        <p>By continuing, you agree to PizzaRestro Conditions of Use and Privacy Notice.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

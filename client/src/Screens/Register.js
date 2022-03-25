import React, { useEffect, useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/asyncMethods/userAsyncMethods'
import { toast } from 'wc-toast';


const Register = () => {
    const dispatch = useDispatch()
    const st = useSelector(s => s.notificationReducer)
    const { loading } = useSelector(state => state.userReducer)

    const [state, setState] = useState({
        Fname: '',
        Lname: '',
        email: '',
        mobile: '',
        password: '',
        cpassword: '',
        address: ''
    })

    useEffect(() => {
        if (st.msg !== '') {
            if (st.msg === 'User Created Successfully!!') {
                toast.success(st.msg);
            } else {
                toast.error(st.msg);
            }

        }
        dispatch({ type: 'REMOVE_MSG' })
    }, [st.msg, dispatch])





    const formSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADING' })
        if (state.password !== state.cpassword) {
            alert('password does not matched...')
            return;
        }
        console.log(state);
        dispatch(register(state))

    }

    const handelForm = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container" style={{ marginTop: '6rem' }}>
            <div className='mt-5 w-50 mx-auto' >
                <wc-toast></wc-toast>
                <h3 className='text-center'>Register Here...</h3>
                <hr />
                <Form autoComplete="off">
                    <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1">
                        <Form.Label>enter first name</Form.Label>
                        <Form.Control
                            onChange={handelForm}
                            value={state.Fname}
                            type="text"
                            name='Fname'
                            placeholder="Enter first name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter Last name</Form.Label>
                        <Form.Control
                            onChange={handelForm}
                            value={state.Lname}
                            type="text"
                            name='Lname'
                            placeholder="Enter last name" />
                    </Form.Group>
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
                        <Form.Label>enter mobile number</Form.Label>
                        <Form.Control
                            onChange={handelForm}
                            value={state.mobile}
                            type="tel"
                            name='mobile'
                            placeholder="Enter Your mobile number" />
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
                    <Form.Group className="mb-3 text-capitalize" controlId="exampleForm.ControlInput1">
                        <Form.Label>confirm password</Form.Label>
                        <Form.Control
                            onChange={handelForm}
                            value={state.cpassword}
                            type="password"
                            name='cpassword'
                            placeholder="●●●●●●●●●●" />
                    </Form.Group>
                    <FloatingLabel controlId="floatingTextarea" label="Enter Full Address" className="mb-3">
                        <Form.Control
                         as="textarea" 
                         onChange={handelForm}
                         value={state.address}
                         name='address'
                         maxLength={200}
                         />
                    </FloatingLabel>
                    <Button type='submit' onClick={formSubmit}>{!loading ? 'Register' : 'loading...'}</Button>
                </Form>
            </div>
        </div>
    )
}

export default Register

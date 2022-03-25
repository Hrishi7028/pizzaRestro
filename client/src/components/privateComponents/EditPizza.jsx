import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { updateThisPizza } from '../../redux/asyncMethods/AdminMethods/PizzaAsyncMethods';
import { toast } from 'wc-toast';
import { useHistory } from 'react-router-dom';


const EditPizza = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    // const {msg} = useSelector(state => state.notificationReducer)
    const [validated, setValidated] = useState(false);
    const { msg } = useSelector(state => state.notificationReducer);
    const [image, setImage] = useState();
    const { editPizza } = useSelector(state => state.adminPizzaReducer)
    const [state, setState] = useState({
        _id: Object.keys(editPizza).length !== 0 ? editPizza._id : '484845145848',
        name: Object.keys(editPizza).length !== 0 ? editPizza.name : 'Pizza Name',
        category: Object.keys(editPizza).length !== 0 ? editPizza.category : 'Pizza Name',
        smallPrice: Object.keys(editPizza).length !== 0 ? editPizza.prices[0]['small'] : 0,
        mediumPrice: Object.keys(editPizza).length !== 0 ? editPizza.prices[0]['medium'] : 0,
        largePrice: Object.keys(editPizza).length !== 0 ? editPizza.prices[0]['large'] : 0,
    })

    // console.log(editPizza);
    useEffect(() => {
        if(msg.length > 0 && msg.includes("does not")) {
            toast.error(msg);
            setTimeout(() => {
                history.push('/')
            }, 1200);
            dispatch({ type: 'REMOVE_MSG' })
        }
        else if (msg.length > 0) {
            toast.success(msg);
            setTimeout(() => {
                history.push('/')
            }, 1200);
            dispatch({ type: 'REMOVE_MSG' })
        }

    }, [msg, dispatch, history]);


    const handelOnChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handelSelectBox = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    const uploadImage = async (image, allData) => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "pizzarestro")
        data.append("cloud_name", "zxcmnb")
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/zxcmnb/image/upload', data)
            // console.log(response.data.url);
            allData.image = response.data.url
            // console.log(allData);
            dispatch(updateThisPizza(allData))
        } catch (error) {
            console.log('line 53 editpizza.js');
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        setValidated(true);
        let prices = [
            {
                small: parseInt(state.smallPrice),
                medium: parseInt(state.mediumPrice),
                large: parseInt(state.largePrice),
            },
        ]

        let data = {
            name: state.name,
            prices: prices,
            category: state.category,
            _id: state._id,
            image: ''
        }
        if(image !== undefined) {
            if ((image.type !== "image/png") && image.type !== "image/jpeg") {
                window.alert('Upload valid image type')
                return;
            }
        } else {
            toast.error('Please Upload image')
            return
        }
        uploadImage(image, data)
    }



    return (
        <div className='container' style={{ marginTop: '7rem' }}>
            <Form autoComplete="off" noValidate validated={validated} method='post' onSubmit={handleSubmit}>
                <wc-toast></wc-toast>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            disabled
                            value={state._id}
                            type="text"
                        // defaultValue={Object.keys(editPizza).length !== 0 ? editPizza._id : 's154547448944'}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Pizza Name:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={handelOnChange}
                        // defaultValue={Object.keys(editPizza).length !== 0 ? editPizza.name : 'Pizza Name'}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Category</Form.Label>
                        <Form.Select as={Col} md="4" name='category' value={state.category} onChange={handelSelectBox}>
                            <option value="Veg">Veg</option>
                            <option value="Non Veg">Non veg</option>
                        </Form.Select>
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                        <Form.Label>Small Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Price"
                            required
                            name='smallPrice'
                            onChange={handelOnChange}
                            value={state.smallPrice}
                        // defaultValue={Object.keys(editPizza).length !== 0 ? editPizza.prices[0]["small"] : '0'} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please Enter the Price
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Medium Price</Form.Label>
                        <Form.Control type="text"
                            value={state.mediumPrice}
                            placeholder="Price"
                            required
                            name='mediumPrice'
                            onChange={handelOnChange}
                        // defaultValue={Object.keys(editPizza).length !== 0 ? editPizza.prices[0]["medium"] : '0'} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please Enter the Price
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Large Price</Form.Label>
                        <Form.Control type="text"
                            value={state.largePrice}
                            onChange={handelOnChange}
                            placeholder="Price"
                            required
                            name='largePrice'
                        // defaultValue={Object.keys(editPizza).length !== 0 ? editPizza.prices[0]["large"] : '0'} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please Enter the Price
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            name='image'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <Form.Control.Feedback type="invalid"
                        >
                            Please upload Image
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
            </Form>
        </div>

    )
}

export default EditPizza;
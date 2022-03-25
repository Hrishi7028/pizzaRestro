import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addnewPizza } from '../../redux/asyncMethods/AdminMethods/PizzaAsyncMethods';
import { toast } from 'wc-toast';
import { useHistory } from 'react-router-dom';
import '../../Styles/New_pizza.css'


const New_pizza = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const { msg } = useSelector(state => state.notificationReducer);
    const { loading } = useSelector(state => state.pizzaReducer);
    const [image, setImage] = useState('');
    const [state, setState] = useState({
        name: '',
        category: 'veg',
        smallPrice: '',
        mediumPrice: '',
        largePrice: '',
        image: ''
    })
    // console.log(msg);
    useEffect(() => {
        if (msg.length > 0) {
            toast.success(msg);
            setTimeout(() => {
                history.push('/')
            }, 1200);
            dispatch({ type: 'REMOVE_MSG' })
        }

    }, [msg, dispatch, history]);



    const handelSelectBox = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handelOnChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const uploadImage = async (image, allData) => {
        dispatch({ type: 'SET_LOADING' })
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "pizzarestro")
        data.append("cloud_name", "zxcmnb")
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/zxcmnb/image/upload', data)
            // console.log(response);
            allData.image = response.data.url
            // console.log(allData);
            dispatch(addnewPizza(allData))
        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' })
            console.log(error.response);
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        console.log();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === false) {
            return;
        }
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
            image: state.img
        }
        // .jpg , .jpeg , .jfif , .pjpeg , .pjp
        if (image.type.includes('jpg') || image.type.includes('jpeg') || image.type.includes('png')) {
            uploadImage(image, data);
        } else {
            window.alert('Please upload proper file')
            return;
        }

        // 
    };

    return (
        <div className="container" style={{ marginTop: '7rem' }}>
            <h2>Add New One Pizza</h2>
            <hr />
            <wc-toast></wc-toast>
            <Form autoComplete="off"  noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="w-100 mx-auto">
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                            <Form.Label>Pizza Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='name'
                                onChange={handelOnChange}
                                value={state.name}
                                placeholder="Pizza Name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                            <Form.Label>Category</Form.Label>
                            <Form.Select as={Col} md="4" name='category' value={state.category} onChange={handelSelectBox}>
                                <option value="Veg">Veg</option>
                                <option value="Non Veg">Non veg</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                            <Form.Label>Small Price</Form.Label>
                            <Form.Control
                                required
                                type="tel"
                                onChange={handelOnChange}
                                name='smallPrice'
                                value={state.smallPrice}
                                placeholder="small Price"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                            <Form.Label>Medium Price</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter medium pizza price"
                                required
                                name='mediumPrice'
                                value={state.mediumPrice}
                                onChange={handelOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Enter the price.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                            <Form.Label>Large Price</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter large pizza price"
                                required
                                name='largePrice'
                                onChange={handelOnChange}
                                value={state.largePrice}
                            />
                            <Form.Control.Feedback type="invalid">
                                Enter the price.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Upload Pizza Image</Form.Label>
                            <Form.Control
                                type="file"
                                name='image'
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>
                    </Row>
                </div>
                <Button type="submit" className='w-25 m-2 custome_btn'>{loading === true ? 'Loading' :'Submit Form'}</Button>
            </Form>
        </div>


    );
}


export default New_pizza
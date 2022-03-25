import React, { useState } from 'react'
import { Container, Nav, Navbar, Modal, Button, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BsMinecartLoaded } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { RiAdminLine } from 'react-icons/ri'
// import MdOutlinePedalBike from 'react-icons/lib/fa/MdOutlinePedalBike'
import { GiDutchBike } from 'react-icons/gi'
import { GiFullPizza } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import '../Styles/Header.css'
import Filter from './Filter.jsx'



const Header = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector(state => state.pizzaReducer)
    const { user } = useSelector((state) => (state.userReducer));
    const logout = () => {
        localStorage.removeItem('User_key')
        localStorage.removeItem('cartPizza')
        dispatch({ type: 'LOGOUT' })
        history.push('/login')
    }

    const links = user ?
        <>
            <LinkContainer to="/">
                <Nav.Link className='activeClass text-center'>{user ? user.Fname : 'Unknown'} {user.isAdmin === 'admin' ? <RiAdminLine /> : <AiOutlineUserAdd />}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/all_your_orders/id">
                <Nav.Link className='activeClass text-center'>Your Orders</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
                <Nav.Link className='activeClass text-center'>Cart <span ><BsMinecartLoaded style={{ color: 'white' }} /></span><span>{state.totalQuantity}</span></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
                <Nav.Link className='activeClass text-center' onClick={handleShow} ><FiLogOut /></Nav.Link>
            </LinkContainer>
        </>
        :
        <>
            <LinkContainer to="/login">
                <Nav.Link className='activeClass text-center'>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
                <Nav.Link className='activeClass text-center'>Register</Nav.Link>
            </LinkContainer>
        </>

    const AdminLinks = user.isAdmin === 'admin' ?
        <>

            <NavDropdown title="Admin" className='Admin_panel' id="basic-nav-dropdown" style={{ color: 'black', marginRight: '5px' ,textAlign:'center'}}>

                <LinkContainer to="/alluser" className='navBorder'>
                    <Nav.Link className='activeClass text-center'>
                        <span className='admin_icon'><AiOutlineUsergroupAdd />  </span>All Users
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/allpizza" className='navBorder'>
                    <Nav.Link className='activeClass text-center'>
                        <span className='admin_icon'><GiFullPizza /></span>
                        All Pizzas
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/allUserOrders" className='navBorder'>
                    <Nav.Link className='activeClass text-center'>
                        <span className='admin_icon'><GiDutchBike /></span>
                        Orders
                    </Nav.Link>
                </LinkContainer>
            </NavDropdown>

        </> : null

    return (
        <>
            <Navbar className='mb-3' collapseOnSelect bg="dark" variant="dark" expand="lg" fixed="top" >
                <Container >
                    <LinkContainer to="/">
                        <Navbar.Brand >PizzaRestro < img src='/logo192.png' alt='logo' height='30px' /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto Admin_panel" style={{ color: 'white', fontSize: '20px' }} >
                        <Filter 
                            className='mx-auto'
                        />
                            {AdminLinks}
                            {links}
                        </Nav>
                    </Navbar.Collapse>
                </Container>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you really want to logout from site
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => {
                            handleClose()
                            logout();
                        }} >
                            Logout
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Navbar >
        </>
    )
}

export default Header


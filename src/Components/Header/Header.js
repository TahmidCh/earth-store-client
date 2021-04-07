import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import 'firebase/auth';
import { isLoggedIn, loggedInInfo } from '../Login/LoginManager';
import logo from './logo.png'



const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const isLogged = isLoggedIn();
    const signOut = () => {
        setLoggedInUser({});
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
    };

    const loggedUser = loggedInInfo()

    return (
        <Container className="header">
            <Navbar sticky="true" bg="***" variant="dark" className="customNavbar">
                <Navbar.Brand href="/">
                    <img className="logo" src={logo} alt=""/>
                </Navbar.Brand>
                <Form.Row>
                    <Form.Group as={Col}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                            />
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Nav className="ml-auto customNav">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="orders">Orders</Nav.Link>
                    <Nav.Link href="admin">Admin</Nav.Link>
                    <Nav.Link href="deals">Deals</Nav.Link>
                    <Nav.Link href="">{loggedInUser.displayName}</Nav.Link>
                    <Link to={`/login`}>
                        {
                            loggedInUser.email ? <Button className="customButton" onClick={() => setLoggedInUser({})}>Log Out</Button>
                                : <Button className="customButton" >Login</Button>
                        }
                    </Link>
                </Nav>
            </Navbar>
        </Container>
    );
};

export default Header;
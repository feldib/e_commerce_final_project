import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logOut } from '../fetching'

function Header(props) { 
    return (
            <Navbar id='header' expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                            <img
                                src='/logo.jpg'
                                width="100"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Link>

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="menu-items">
                        <FontAwesomeIcon id="header-toggler" icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="menu-idems">
                        <Nav className='mx-auto'>
                            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/search">
                                Search
                            </Link>
                            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/about">
                                About us
                            </Link>
                            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contact">
                                Contact us
                            </Link>
                            {props.loggedIn ?
                                <>
                                {props.user && !props.user.is_admin ?
                                <>
                                    <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/shopping_cart">
                                        Shopping cart
                                    </Link>

                                    <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/user">
                                        {props.user.first_name}'s Page
                                    </Link>
                                </>:

                                <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/admin">
                                    Admin Page
                                </Link>
                                }
                                
                                <Nav.Link
                                    onClick={async()=>{
                                        await logOut()
                                    }}
                                >
                                    Log out
                                </Nav.Link>
                                </>
                            :
                                <>
                                    <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login">
                                        Log in
                                    </Link>
  
                                    <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/register">
                                        Register
                                    </Link>
                                </>
                            }
                           

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default Header
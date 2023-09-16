import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoggedInNavbarItems from './LoggedInNavbarItems'
import NotLoggedInNavbarItems from './NotLoggedInNavbarItems'
import { ToastContainer, toast } from 'react-toastify'

function Header(props) { 
    const [expanded, setExpanded] = React.useState(false)

    const signed_out_shopping_cart = JSON.parse(localStorage.getItem("shopping_cart")) || []
    return (
            <Navbar id='header' expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                            <img
                                src='/logo.png'
                                width="100"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Link>

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="menu-items">
                        <FontAwesomeIcon id="header-toggler" icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="menu-items">
                        <Nav className='mx-auto'>
                            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/search">
                                Search
                            </Link>
                            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/about">
                                About
                            </Link>
                            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contact">
                                Contact
                            </Link>
                            
                            {!props.user.is_admin &&
                                <Link 
                                    className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                    to = {!signed_out_shopping_cart.length ? "#": "/shopping_cart"}
                                    onClick={()=>{
                                        if(!signed_out_shopping_cart.length){
                                            toast.warning("Shopping list is empty.", {
                                                className: "toast-warning"
                                            })
                                        }
                                    }}
                                >
                                    Shopping cart
                                </Link>
                            }
                            
                            {props.loggedIn ?
                                <LoggedInNavbarItems 
                                    first_name={props.user.first_name}
                                    user={props.user}
                                />
                            :
                                <NotLoggedInNavbarItems />
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>

                

            </Navbar>
    )
}

export default Header
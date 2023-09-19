import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoggedInNavbarItems from './LoggedInNavbarItems'
import NotLoggedInNavbarItems from './NotLoggedInNavbarItems'
import { toast } from 'react-toastify'
import useShoppingList from '../../hooks/useShoppingList'
import { checkIfShoppingCartIsEmpty } from '../../helpers/helpers'

function Header(props) { 
    let shoppingListItems = useShoppingList(props.loggedIn)
    
    return (
            <Navbar id='header' expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                            <img
                                src='/logo.png'
                                width="100"
                                className="d-inline-block align-top"
                                alt="Artwork market logo"
                            />
                        </Link>

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="menu-items">
                        <FontAwesomeIcon id="header-toggler" icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse className='mx-3' id="menu-items">
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
                                <a 
                                    className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit', cursor: "pointer"}} 
                                    href="#"
                                    onClick={async()=>{
                                        const isShoppingCartEmpty = await checkIfShoppingCartIsEmpty(props.loggedIn)

                                        if(!isShoppingCartEmpty){
                                            toast.warning("Shopping list is empty.", {
                                                className: "toast-warning"
                                            })

                                        }else{
                                            window.location = "/shopping_cart"
                                        }
                                    }}
                                >
                                    Shopping cart
                                </a>
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
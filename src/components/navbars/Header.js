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
import { UserDataContext } from '../../App'

function Header(props) { 
    const {user, loggedIn} = React.useContext(UserDataContext)

    let shoppingListItems = useShoppingList(loggedIn)

    const [expanded, setExpanded] = React.useState(false)

    const toggleExpanded = () => {setExpanded(!expanded)}

    const closeExpandedNav = () => {setExpanded(false)}
    
    return (
            <Navbar id='header' expand="lg" expanded={expanded}>
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
                    <Navbar.Toggle 
                        onClick={
                            () => toggleExpanded()
                        } aria-controls="menu-items"
                    >
                        <FontAwesomeIcon id="header-toggler" icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse className='mx-3' id="menu-items">
                        <Nav className='mx-auto'>
                            <Link 
                                onClick = {()=>closeExpandedNav()}
                                className='nav-link' 
                                style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                to="/search"
                            >
                                Search
                            </Link>
                            <Link  
                                onClick = {()=>closeExpandedNav()}
                                className='nav-link' 
                                style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                to="/about"
                            >
                                About
                            </Link>
                            <Link 
                                onClick = {()=>closeExpandedNav()}
                                className='nav-link' 
                                style={{ color: 'inherit', textDecoration: 'inherit'}} 
                                to="/contact"
                            >
                                Contact
                            </Link>
                            
                            {!user.is_admin &&
                                <a 
                                    className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit', cursor: "pointer"}} 
                                    href="#"
                                    onClick={async()=>{
                                        closeExpandedNav()

                                        const isShoppingCartEmpty = await checkIfShoppingCartIsEmpty(loggedIn)

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
                            
                            {loggedIn ?
                                <LoggedInNavbarItems closeExpandedNav={closeExpandedNav}/>
                            :
                                <NotLoggedInNavbarItems closeExpandedNav={closeExpandedNav}/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>

                

            </Navbar>
    )
}

export default Header
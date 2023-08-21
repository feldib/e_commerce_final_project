import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import server_url from '../server'

function Header(props) {
    
    const logOut = async(id)=>{
        await fetch(
            `${server_url}/log_out`,
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({
                      id
                  })
              }
          ).then((response)=>{
              console.log(response)
              window.location.replace("/")
          })
          .catch((err)=>{console.log(err)})
        }
    
    return (
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                            Artwork Market
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="menu-items" />
                    <Navbar.Collapse id="menu-idems">
                        <Nav className='mx-auto'>
                            <Nav.Link>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                    Browse
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/about">
                                    About us
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contact">
                                    Contact us
                                </Link>
                            </Nav.Link>
                            {props.loggedIn ?
                                <>
                                {!props.user.is_admin ?
                                <>
                                    <Nav.Link>
                                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/shopping_cart">
                                            Shopping cart
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/user">
                                            Profile Page
                                        </Link>
                                    </Nav.Link>
                                </>:

                                <Nav.Link>
                                    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/admin">
                                        Admin Page
                                    </Link>
                                </Nav.Link>
                                }
                                
                                <Nav.Link
                                    onClick={async()=>{
                                        await logOut(props.user.id)
                                    }}
                                >
                                    Log out
                                </Nav.Link>
                                </>
                            :
                                <>
                                 <Nav.Link>
                                    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login">
                                        Log in
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/register">
                                        Register
                                    </Link>
                                </Nav.Link>
                                </>
                            }
                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default Header
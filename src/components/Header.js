import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

function Header() {
    return (
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand>
                        Artwork Market
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="menu-items" />
                    <Navbar.Collapse id="menu-idems">
                        <Nav className='mx-auto'>
                            <Nav.Link>
                                Browse
                            </Nav.Link>
                            <Nav.Link>
                                About us
                            </Nav.Link>
                            <Nav.Link>
                                Contact us
                            </Nav.Link>
                            <Nav.Link>
                                Log in
                            </Nav.Link>
                            <Nav.Link>
                                Register
                            </Nav.Link>
                            <Nav.Link>
                                Shopping cart
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default Header
import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
            <Navbar fixed="bottom bg-white">
                <Container>
                    <Nav className='mx-auto' col="12">
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
                        <Nav.Link>
                            <FontAwesomeIcon icon={faShareAlt} />
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
}

export default Footer
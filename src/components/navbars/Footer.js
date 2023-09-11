import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
            <Navbar id='footer' fixed="bottom">
                <Container>
                    <Nav className='mx-auto' col="12">
                        <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/about">
                            About us
                        </Link>
                        
                        <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contact">
                            Contact us
                        </Link>

                        <Nav.Link>
                            <FontAwesomeIcon icon={faShareAlt} className='share-icon'/>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
}

export default Footer
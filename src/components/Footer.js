import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
            <Navbar fixed="bottom bg-white">
                <Container>
                    <Nav className='mx-auto' col="12">
                        <Nav.Link>
                            About us
                        </Nav.Link>
                        <Nav.Link>
                            Contact us
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
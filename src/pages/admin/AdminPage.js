import React from 'react'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import Orders from '../../subpages/admin/Orders'
import Reviews from '../../subpages/admin/Reviews'
import Messages from '../../subpages/admin/Messages'
import Users from '../../subpages/admin/Users'
import Artworks from '../../subpages/admin/Artworks'

function AdminPage() {
    return (
        <Container className='mb-5 pb-5'>
            <Row>
                <Col>
                    <Navbar >
                        <Container>
                            <Nav className='mx-3 text-center justify-content-between w-100'>
                                <Nav.Link>
                                    <h3>Artworks</h3>
                                </Nav.Link>
                                <Nav.Link>
                                    <h3>Users</h3>
                                </Nav.Link>
                                <Nav.Link>
                                    <h3>Orders</h3>
                                </Nav.Link>
                                <Nav.Link>
                                    <h3>Reviews</h3>
                                </Nav.Link>
                                <Nav.Link>
                                    <h3>Messages</h3>
                                </Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </Col>
            </Row>

            <Row className='mb-5'>
                <Artworks />
            </Row>
        </Container>
    )
}

export default AdminPage
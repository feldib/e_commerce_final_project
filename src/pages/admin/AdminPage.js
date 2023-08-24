import React from 'react'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';

function AdminPage() {
    return (
        <Container className='pb-5'>
            <Row>
                <Col>
                    <Navbar>
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

            <Row className='pb-5'>
                <Outlet />

            </Row>
        </Container>
    )
}

export default AdminPage
import React from 'react'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import OrderHistory from '../../subpages/user/OrderHistory'
import UserData from '../../subpages/user/UserData'
import WishList from '../../subpages/user/WishList'

function ProfilePage() {
    return (
        <Container>
            <Row>
                <Col>
                    <Navbar >
                        <Container>
                            <Nav className='mx-3 text-center  justify-content-between w-100'>
                                <Nav.Link>
                                    <h3>User Data</h3>
                                </Nav.Link>
                                <Nav.Link>
                                    <h3>Order History</h3>
                                </Nav.Link>
                                <Nav.Link>
                                    <h3>Wishlist</h3>
                                </Nav.Link>
                                <Nav.Link>
                                    <h3>Reviews</h3>
                                </Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </Col>
            </Row>

            <Row>
                <OrderHistory />
            </Row>
        </Container>
    )
}

export default ProfilePage
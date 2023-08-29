import React from 'react'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import OrderHistory from '../../subpages/user/OrderHistory'
import UserData from '../../subpages/user/UserData'
import WishList from '../../subpages/user/WishList'

function ProfilePage(props) {
    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>{props.user.first_name}'s page</h1>
            </Row>
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
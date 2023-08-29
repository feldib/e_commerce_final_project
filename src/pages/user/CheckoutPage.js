import React from 'react'
import { Container, Form, Col, Row, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faQuestion, faHouse, faPhone,faGear } from '@fortawesome/free-solid-svg-icons'

function CheckoutPage() {
    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Checkout</h1>
            </Row>
            <Row className='pb-5'>
                <Col className='mx-5'>
                    <Row>
                        <h3>Invoice data</h3>
                    </Row>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>

                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} className='mx-3'/>
                                </InputGroup.Text>

                                <Form.Control type="email" placeholder="email@example.co.il" disabled/>

                                <Button variant="primary" type="submit">
                                    <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>

                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faKey} className='mx-3'/>
                                </InputGroup.Text>

                                <Form.Control type="password" placeholder="********" disabled/>

                                <Button variant="primary" type="submit">
                                    <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>

                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                                </InputGroup.Text>

                                <Form.Control type="text" placeholder="James" disabled/>

                                <Button variant="primary" type="submit">
                                    <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                                </InputGroup.Text>

                                <Form.Control type="text" placeholder="Smith" disbaled />

                                <Button variant="primary" type="submit">
                                    <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faHouse} className='mx-3'/>
                                </InputGroup.Text>

                                <Form.Control type="text" placeholder="Budapest, Hungary" disabled />

                                <Button variant="primary" type="submit">
                                    <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPhone} className='mx-3'/>
                                </InputGroup.Text>

                                <Form.Control type="text" placeholder="+36 xx xxx xxxx" disabled />

                                <Button variant="primary" type="submit">
                                    <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Order
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CheckoutPage
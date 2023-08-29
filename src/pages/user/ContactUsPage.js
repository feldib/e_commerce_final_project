import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap'

function ContactUsPage() {
    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Contact us</h1>
            </Row>
            <Row>
                <Col sm={12} md={5} className='pb-5'>
                    <Row>
                        <h2>Company details</h2>
                    </Row>

                    <Row>
                        <p>Name: Artwork Market</p>
                        <p>Address: Budapest, Hungary</p>
                        <p>Phone: +36 xx xxx xxxx</p>
                    </Row>
                </Col>

                <Col sm={12} md={5} className='pb-5'>
                    <Row>
                        <h2>Message administrator</h2>
                    </Row>

                    <Row>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faUser} className='mx-3'/>
                                    </InputGroup.Text>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="Enter message title" />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <FloatingLabel>
                                    <Form.Control
                                    as="textarea"
                                    placeholder="Enter message"
                                    style={{ height: '100px' }}
                                    />
                                </FloatingLabel>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Send
                            </Button>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactUsPage;
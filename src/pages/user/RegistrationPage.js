import React from 'react'
import { Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKey, faQuestion, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons'

function RegistrationPage() {
    return (
        <Row>
            <Col className='mx-5'>
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
                        <Form.Label>Email address again</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="Enter email again" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faKey} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Enter password" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password again</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faKey} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Enter password again" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter First Name" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter Last Name" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faHouse} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter Address" />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Numbe</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faPhone} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter Phone Numbe" />
                        </InputGroup>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default RegistrationPage
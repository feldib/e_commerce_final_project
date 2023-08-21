import React from 'react'
import { Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKey, faQuestion, faHouse, faPhone,faGear } from '@fortawesome/free-solid-svg-icons'

function UserData() {
    return (
        <Row>
            <Col className='mx-5'>
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
                        Sign In
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default UserData
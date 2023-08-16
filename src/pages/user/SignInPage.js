import React from 'react'
import { Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKey } from '@fortawesome/free-solid-svg-icons'

function SignInPage() {
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
                        <Form.Label>Password</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faKey} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Enter password" />
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

export default SignInPage
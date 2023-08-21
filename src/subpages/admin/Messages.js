import React from 'react'
import { Button, Col, Row, Form, InputGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAsterisk } from '@fortawesome/free-solid-svg-icons'

function Messages() {
    return (
        <Col>
            <Row className='text-center'>
                <h2>Unanswered messages</h2>
            </Row>

            <Row>
                <Row className='mb-5'>
                    <Col>
                        <Row>
                            <h4>[User's name]</h4>
                        </Row>

                        <Row>
                            <p>Email: [email address]</p>
                        </Row>
                        
                        <Row>
                            <p>Message title: [title]</p>
                        </Row>

                        <Row>
                            <p>Lorem ipsum React Bootstrap textarea is an input dedicated for a large volume of text. It may be used in a variety of components like forms, comment sections and forums. Textareas don’t have to be boring. They can be enhanced with colors, shadows or rounded corners. React-bootstrap has some attributes like height width. Textarea is by default autosize; But you can set minimum height and width of textarea in react usin</p>
                        </Row>

                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reply</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <Form.Control 
                                                type="textarea" 
                                                placeholder="Enter Address" 
                                                style={{height: "100px"}}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Button type="submit" variant="primary">Send</Button>

                                </Form>
                            </Col>
                        </Row>

                    </Col>
                </Row>

                <Row className='mb-5'>
                    <Col>
                        <Row>
                            <h4>[User's name]</h4>
                        </Row>

                        <Row>
                            <p>Email: [email address]</p>
                        </Row>
                        
                        <Row>
                            <p>Message title: [title]</p>
                        </Row>

                        <Row>
                            <p>Lorem ipsum React Bootstrap textarea is an input dedicated for a large volume of text. It may be used in a variety of components like forms, comment sections and forums. Textareas don’t have to be boring. They can be enhanced with colors, shadows or rounded corners. React-bootstrap has some attributes like height width. Textarea is by default autosize; But you can set minimum height and width of textarea in react usin</p>
                        </Row>

                        <Row>
                            <Col>
                                <Button variant='secondary'>
                                    Answer
                                </Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </Row>
        </Col>
    )
}

export default Messages
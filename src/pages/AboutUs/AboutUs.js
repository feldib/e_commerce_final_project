import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap'

function AboutUsPage() {
    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>About us</h1>
            </Row>
            <Row>
                <Col className='pb-5'>
                    <Row>
                        <h2>Our story</h2>
                    </Row>

                    <Row>
                        <p>Lorem ipsum.</p>
                        <p>Lorem ipsum; dolor. sit amet?</p>
                        <p>React Bootstrap textarea is an input dedicated for a large volume of text. It may be used in a variety of components like forms, comment sections and forums. Textareas don’t have to be boring. They can be enhanced with colors, shadows or rounded corners. React-bootstrap has some attributes like height width. Textarea is by default autosize; But you can set minimum height and width of textarea in react using react-bootstrap.</p>
                    </Row>
                </Col>

            </Row>
        </Container>
    )
}

export default AboutUsPage;
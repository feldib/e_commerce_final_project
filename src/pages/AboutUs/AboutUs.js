import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import PageTitle from '../../components/PageTitle'

function AboutUsPage() {
    return (
        <Container className='px-3 pb-5'>
            <PageTitle title="About us" />
            <Row className='mx-auto mb-5'>
                <Col className='pb-5 floating-element'>
                    <Row className='text-center'>
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
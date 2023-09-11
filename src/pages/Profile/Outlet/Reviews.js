import React from 'react'
import { Col, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'

function Reviews() {
    return (
        <Col>
            <Row className='text-center'>
                <h2>Past reviews</h2>
            </Row>

            <Row>
                <Row className='mb-5'>
                    <Col>
                        <Row>
                            <h4>Review 3</h4>
                        </Row>

                        <Row>
                            <p>Product: [title]</p>
                        </Row>
                        
                        <Row>
                            <p>Artist: [artist]</p>
                        </Row>
                        
                        <Row>
                            <p>User: [user's name]</p>
                        </Row>

                        <Row>
                            <p>Lorem ipsum React Bootstrap textarea is an input dedicated for a large volume of text. It may be used in a variety of components like forms, comment sections and forums. Textareas don’t have to be boring. They can be enhanced with colors, shadows or rounded corners. React-bootstrap has some attributes like height width. Textarea is by default autosize; But you can set minimum height and width of textarea in react usin</p>
                        </Row>

                    </Col>
                </Row>

                <Row className='mb-5'>
                    <Col>
                        <Row>
                            <h4>Review 2</h4>
                        </Row>

                        <Row>
                            <p>Product: [title]</p>
                        </Row>
                        
                        <Row>
                            <p>Artist: [artist]</p>
                        </Row>
                        
                        <Row>
                            <p>User: [user's name]</p>
                        </Row>

                        <Row>
                            <p>Lorem ipsum React Bootstrap textarea is an input dedicated for a large volume of text. It may be used in a variety of components like forms, comment sections and forums. Textareas don’t have to be boring. They can be enhanced with colors, shadows or rounded corners. React-bootstrap has some attributes like height width. Textarea is by default autosize; But you can set minimum height and width of textarea in react usin</p>
                        </Row>


                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Row>
                            <h4>Review 1</h4>
                        </Row>

                        <Row>
                            <p>Product: [title]</p>
                        </Row>
                        
                        <Row>
                            <p>Artist: [artist]</p>
                        </Row>
                        
                        <Row>
                            <p>User: [user's name]</p>
                        </Row>

                        <Row>
                            <p>Lorem ipsum React Bootstrap textarea is an input dedicated for a large volume of text. It may be used in a variety of components like forms, comment sections and forums. Textareas don’t have to be boring. They can be enhanced with colors, shadows or rounded corners. React-bootstrap has some attributes like height width. Textarea is by default autosize; But you can set minimum height and width of textarea in react usin</p>
                        </Row>


                    </Col>
                </Row>

            </Row>
        </Col>
    )
}

export default Reviews
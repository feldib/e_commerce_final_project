import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Carousel, Form, Button } from 'react-bootstrap'

function ReviewsOfArtworks(props) {
    return (
        props.reviews.map((review, index)=>{
            return (
                <Col key={index}>
                    <Row>
                        <h6>
                            {review.title}
                        </h6>
                    </Row>

                    <Row>
                        <p>
                            {review.review_text}
                        </p>
                    </Row>

                    <Row className='text-center'>
                        <Col>
                            <FontAwesomeIcon icon={faAngleLeft} style={{
                                padding: "2px"
                            }} />
                        </Col>
                        
                        <Col>
                            <FontAwesomeIcon icon={faAngleRight} style={{
                                padding: "2px"
                            }} />
                        </Col>
                    </Row>
                </Col>
            )
        })
    )
}

export default ReviewsOfArtworks
import React from 'react'
import { Col, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
import { approveReview, disapproveReview } from '../fetching'

function AdminReview(props) {
    const [showReview, setShowReview] = React.useState(true)
    return (
        <>
            {showReview && 
                <Row className='mb-5'>
                    <Col>
                        <Row>
                            <h4>Review {props.index}</h4>
                        </Row>

                        <Row>
                            <p>Title: {props.review.title}</p>
                        </Row>
                        
                        <Row>
                            <p>Artist: {props.review.artist_name}</p>
                        </Row>
                        
                        <Row>
                            <p>User: {props.review.name}</p>
                        </Row>

                        <Row>
                            <p>{props.review.reviews_text}</p>
                        </Row>

                        <Row>
                            <Col>
                                <FontAwesomeIcon 
                                    icon={faCheck} 
                                    style={{color: "blue", cursor: "pointer"}} 
                                    onClick={()=>{
                                        approveReview(props.review.id)
                                        setShowReview(false)
                                    }}
                                />
                            </Col>

                            <Col>
                                <FontAwesomeIcon 
                                    icon={faX} 
                                    style={{color: "red", cursor: "pointer"}} 
                                    onClick={()=>{
                                        disapproveReview(props.review.id)
                                        setShowReview(false)
                                    }}
                                />
                            </Col>
                        </Row>

                    </Col>
                </Row>
            }
        </>
        
    )
}

export default AdminReview
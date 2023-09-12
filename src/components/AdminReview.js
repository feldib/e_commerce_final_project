import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
import { approveReview, disapproveReview } from '../fetching'
import { Link } from 'react-router-dom'

function AdminReview(props) {
    const [showReview, setShowReview] = React.useState(true)
    return (
        <>
            {showReview && 
                <Row className='mb-5'>
                    <Card className='p-3'>
                        <Card.Title>
                            <p>Title: {props.review.title}</p>
                        </Card.Title>

                        <Card.Subtitle>
                            <p>User: {props.review.name}</p>
                        </Card.Subtitle>

                        <Card.Subtitle>
                            <p>
                                Item: <Link to={`/artwork_page/${props.review.artwork_id}`}>
                                    {props.review.artwork_title}
                                </Link> by {props.review.artist_name}
                            </p>
                        </Card.Subtitle>
                        

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

                    </Card>
                </Row>
            }
        </>
        
    )
}

export default AdminReview
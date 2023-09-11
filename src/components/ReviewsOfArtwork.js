import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { Card, Row, Carousel } from 'react-bootstrap'

function ReviewsOfArtworks(props) {
    return (
        <>
            {props.reviews.length ?
                <Carousel >
                    {props.reviews.map((review, index)=>{
                        return (
                            <Carousel.Item className='px-5' key={index}>
                                <Card className='mx-5 p-3' border='secondary'>
                                    <Card.Title className="mb-2">
                                        {review.title}
                                    </Card.Title>

                                    <Card.Subtitle className="mb-2 text-muted">
                                        by {review.name}
                                    </Card.Subtitle>

                                    <Card.Text className="mb-2">
                                        {review.review_text}
                                    </Card.Text>
                                </Card>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>

                :

                <p className='text-center'>
                    ---- No reviews ----
                </p>
            }
        </>
    )
}

export default ReviewsOfArtworks
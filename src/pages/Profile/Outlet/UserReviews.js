import React from 'react'
import { Col, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
import useLoading from '../../../hooks/useLoading'
import useAxios from '../../../hooks/useAxios'
import { users_url } from '../../../utils/api_constants'
import Review from '../../../components/Review'

function Reviews() {
    const reviews = useAxios(`/${users_url}/get_reviews_of_user`)
    const representReviews = useLoading(reviews, ((reviews)=>{
        return reviews.map((review, index)=>{
            return <Review review={review} index={index+1} admin={false} />
        })
    }))
    return (
        <Col>
            <Row className='text-center'>
                <h2>Past reviews</h2>
            </Row>

            <Row>
                {representReviews}
            </Row>
        </Col>
    )
}

export default Reviews
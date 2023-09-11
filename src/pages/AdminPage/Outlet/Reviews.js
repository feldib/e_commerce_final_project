import React from 'react'
import { Col, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
import useLoading from '../../../hooks/useLoading'
import useAxios from '../../../hooks/useAxios'
import { admin_url } from '../../../utils/api_constants'
import AdminReview from '../../../components/AdminReview'

function Reviews() {
    const reviews = useAxios(`/${admin_url}/get_unapproved_reviews`)
    const representReviews = useLoading(reviews, ((reviews)=>{
        return reviews.map((review, index)=>{
            return <AdminReview review={review} index={index+1} />
        })
    }))
    return (
        <Col>
            <Row className='text-center'>
                <h2>New reviews</h2>
            </Row>

            <Row>
                {representReviews}
            </Row>
        </Col>
    )
}

export default Reviews
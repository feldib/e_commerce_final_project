import React from 'react'
import { Col, Row} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
import useLoading from '../../../hooks/useLoading'
import useAxios from '../../../hooks/useAxios'
import { admin_url } from '../../../utils/api_constants'
import Review from '../../../components/Review'
import SubPageTitle from '../../../components/SubPageTitle'
import { redirectIfNotloggedIn, redirectIfNotAdmin } from '../../../helpers/helpers'


function Reviews(props) {
    redirectIfNotloggedIn()
    redirectIfNotAdmin()

    const reviews = useAxios(`/${admin_url}/get_unapproved_reviews`)
    const representReviews = useLoading(reviews, ((reviews)=>{
        return reviews.map((review, index)=>{
            return <Review review={review} index={index+1} admin={true} />
        })
    }))
    return (
        <Col>
            <SubPageTitle title="New reviews" />

            <Row>
                {representReviews}
            </Row>
        </Col>
    )
}

export default Reviews
import React from 'react'
import { Col, Row, Card, ListGroupItem, ListGroup } from 'react-bootstrap'
import useAxios from '../hooks/useAxios'
import useLoading from '../hooks/useLoading'
import { addToShoppingList } from '../fetching'
import { ToastContainer, toast } from 'react-toastify'
import FavouriteButton from './buttons/FavouriteButton'
import ShoppingCartButton from './buttons/ShoppingCartButton'
import ReviewsOfArtworks from './ReviewsOfArtwork'
import LeaveReview from './LeaveReview'
import ArtworkPicturesCarousel from './ArtworkPicturesCarousel'

function ArtworkDetails(props) {
    const reviewsData = useAxios(`/reviews?id=${props.artwork_id}`)
    const [quantity, setQuantity] = React.useState(props.artwork.quantity)

    const reviews = useLoading(reviewsData, (reviews)=>{
        return (
            <ReviewsOfArtworks 
                reviews = {reviews}
            />
        )
    })

    const [reviewIndex, setReviewIndex] = React.useState(0)

    return (
        <>
            <Row className='mb-5 mt-5'>
                <Col sm={12} md={4} className='mb-3'>
                    <Card className='mx-auto' border='secondary'>
                        <Card.Body className='p-3'>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        <h3>
                                            {props.artwork.title}
                                        </h3>
                                    </Card.Title>

                                    <Card.Subtitle>
                                        <h6>
                                            {`by ${props.artwork.artist_name}`}
                                        </h6>
                                    </Card.Subtitle>
                                </Col>

                                <Col className='text-end px-3'>
                                    <span onClick={
                                        ()=>{
                                            if(props.loggedIn && quantity>0){
                                                setQuantity(quantity-1)
                                            }
                                        }
                                    }>
                                        <ShoppingCartButton
                                            artwork_id={props.artwork_id}
                                            loggedIn={props.loggedIn}
                                        />
                                    </span>
                                    
                                    <FavouriteButton
                                        artwork_id={props.artwork_id}
                                        loggedIn={props.loggedIn}
                                    />
                                    <ToastContainer position='top-right'/>
                                </Col>
                            </Row>
                        </Card.Body>
                        

                        <Card.Img 
                            src={props.artwork.thumbnail} 
                            variant='bottom'
                        />
                    </Card>                    
                </Col>

                <Col md={8} className='mb-3'>
                    <Card className='mx-auto'  border='secondary'>
                        <Card.Body className='p-3 px-3'>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        <h3>Description</h3>
                                    </Card.Title>

                                    <Card.Subtitle>
                                        <p>{props.artwork.descript}</p>
                                    </Card.Subtitle>
                                </Col>

                                <Col className='text-end px-3'>
                                    <span onClick={
                                        ()=>{
                                            if(props.loggedIn && quantity>0){
                                                setQuantity(quantity-1)
                                            }
                                        }
                                    }>
                                        <ShoppingCartButton
                                            artwork_id={props.artwork_id}
                                            loggedIn={props.loggedIn}
                                        />
                                    </span>
                                    
                                    <FavouriteButton
                                        artwork_id={props.artwork_id}
                                        loggedIn={props.loggedIn}
                                    />
                                    <ToastContainer position='top-right'/>
                                </Col>
                            </Row>

                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Col>
                                        <Row>
                                            <p><strong>{props.artwork.cname}</strong></p>
                                        </Row>
                                    </Col>

                                    <Col>
                                        <Row>
                                            <p>{props.artwork.tags.map((tag)=>{
                                                return tag.tname
                                            }).join(", ")}</p>
                                        </Row>
                                    </Col>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Col>
                                        <Row>
                                            <p>{"Available quantity: "}
                                                {props.artwork ?
                                                    quantity :
                                                    <div className="d-flex justify-content-center">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                }
                                            </p>
                                        </Row>

                                        <Row>
                                            <p>{"Price: €"}
                                                {props.artwork ?
                                                    props.artwork.price :
                                                    <div className="d-flex justify-content-center">
                                                        <div className="spinner-border" role="status" />
                                                    </div>
                                                }
                                            </p>
                                        </Row>
                                    </Col>

                                    
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <ArtworkPicturesCarousel 
                other_pictures = {props.artwork.other_pictures}
            />

            <Row className='mt-5'>
                    <Row className='text-center'>
                        <h4>REVIEWS</h4>
                    </Row>

                    <Row>
                        {reviews}
                    </Row>
            </Row>

            <LeaveReview 
                loggedIn={props.loggedIn}
                artwork_id={props.artwork_id}
            />
    </>
)
}

export default ArtworkDetails
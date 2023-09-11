import React from 'react'
import { Col, Row, Carousel, Form, Button } from 'react-bootstrap'
import useAxios from '../hooks/useAxios'
import useLoading from '../hooks/useLoading'
import { addToShoppingList } from '../fetching'
import { ToastContainer, toast } from 'react-toastify'
import FavouriteButton from './FavouriteButton'
import ShoppingCartButton from './ShoppingCartButton'
import ReviewsOfArtworks from './ReviewsOfArtwork'

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
            <Row>
                <Col sm={12} lg={4}>
                    <Row>
                        <Col>
                            <Row>
                                <h3>
                                    {props.artwork.title}
                                </h3>
                            </Row>
                            
                            <Row>
                                <h6>
                                {`by ${props.artwork.artist_name}`}
                                </h6>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col >
                            <img 
                                src={props.artwork.thumbnail} 
                                height="200"
                                weight="200"
                                style={{objectFit: "contain"}}
                            />
                        </Col>
                    </Row>
                    
                </Col>


                <Col>
                    <Row>
                        <Col>
                            <Row>
                                <h5>
                                    Category:
                                </h5>
                            </Row>

                            <Row>
                                <p>{props.artwork.cname}</p>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <h5>Tags:</h5>
                            </Row>

                            <Row>
                                <p>{props.artwork.tags.map((tag)=>{
                                    return tag.tname
                                }).join(", ")}</p>
                            </Row>
                        </Col>

                    </Row>

                    <Row>
                        <h3>Description</h3>
                    </Row>

                    <Row>
                        <p>{props.artwork.descript}</p>
                    </Row>
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col lg={6} sm={12}>
                    <Row className='text-center'>
                        <h4>REVIEWS</h4>
                    </Row>

                    <Row>
                        {reviews}
                        
                    </Row>
                </Col>

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

                <Col>
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

            <Row className='d-none d-lg-flex gx-5 gy-3 justify-content-center'>
                <Col lg={3}>
                    <img 
                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                height="200"
                                weight="200"
                                style={{objectFit: "contain"}}
                    />
                </Col>

                <Col lg={3}>
                    <img 
                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                height="200"
                                weight="200"
                                style={{objectFit: "contain"}}
                    />
                </Col>

                <Col lg={3}>
                    <img 
                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                height="200"
                                weight="200"
                                style={{objectFit: "contain"}}
                    />
                </Col>
            </Row>

            <Row className='d-lg-none'>
                <Carousel>
                    <Carousel.Item>
                        <img 
                                    src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                    width="100%"
                                    style={{objectFit: "contain"}}
                        />
                    </Carousel.Item>


                    <Carousel.Item>
                        <img 
                                    src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                    width="100%"
                                    style={{objectFit: "contain"}}
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img 
                                    src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                    width="100%"
                                    style={{objectFit: "contain"}}
                        />
                    </Carousel.Item>
                </Carousel>
            </Row>

            <Row>
                <Col className='mx-5 mt-5'>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <h4>Add a review</h4>
                            </Form.Label>
                            <Form.Control type="textarea" style={{height: "200px"}}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                
            </Row>
    </>
)
}

export default ArtworkDetails
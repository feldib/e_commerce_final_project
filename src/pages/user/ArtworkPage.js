import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Carousel, Form, Button } from 'react-bootstrap'


function ArtworkPage() {
    return (
        <Container>
            <Row className='mt-5'>
                <Col sm={12} lg={4}>
                    <Row>
                        <Col>
                            <Row>
                                <h3>Mona Lisa</h3>
                            </Row>
                            
                            <Row>
                                <h6>by Michelangelo</h6>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col >
                        <img 
                            src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
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
                                <h5>Categories:</h5>
                            </Row>

                            <Row>
                                <p>Italian, Renessaince</p>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <h5>Tags:</h5>
                            </Row>

                            <Row>
                                <p>Painting, Oil Painting</p>
                            </Row>
                        </Col>

                    </Row>

                    <Row>
                        <h3>Description</h3>
                    </Row>

                    <Row>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                    </Row>
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col lg={6} sm={12}>
                    <Row className='text-center'>
                        <h4>REVIEWS</h4>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <h6>So-so</h6>
                            </Row>

                            <Row>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. </p>
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
                    </Row>
                </Col>

                <Col>
                    <Row>
                        <p>Available quantity: 5</p>
                    </Row>

                    <Row>
                        <p>Price: €500</p>
                    </Row>
                </Col>

                <Col>
                    <Row>
                        <p style={{cursor: "pointer"}}>
                            <FontAwesomeIcon icon={faBasketShopping} />
                        </p>
                    </Row>
                    <Row>
                        <p style={{cursor: "pointer"}}>
                            <FontAwesomeIcon icon={faHeart} />
                        </p>
                    </Row>
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

        </Container>
    )
}

export default ArtworkPage
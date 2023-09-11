import React from 'react'
import { Col, Row, Carousel, Card } from 'react-bootstrap'

function ArtworkPicturesCarousel(props) {
    return (<>
        {props.other_pictures.length > 0 &&
            <Row>
                <Col md={8} lg={6} className='mx-auto'>
                    <Carousel>
                        {props.other_pictures.map((pic)=>{
                            return (
                                <Carousel.Item>
                                    <Card>
                                        <Card.Img 
                                            src={`${pic.picture_path}`} 
                                            width="100%"
                                            style={{objectFit: "contain"}}
                                        />
                                    </Card>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Col>
            </Row>
        }
    </>)
}

export default ArtworkPicturesCarousel
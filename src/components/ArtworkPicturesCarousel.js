import React from 'react'
import { Col, Row, Carousel, Card } from 'react-bootstrap'

function ArtworkPicturesCarousel(props) {
    return (<>
        {props.other_pictures.length > 0 &&
            <Row >
                <Col sm={9} md={8} className='mx-auto'>
                    <Carousel>
                        {props.other_pictures.map((pic, index)=>{
                            return (
                                <Carousel.Item className='mb-5 px-3' key={index}>
                                    <Card className='mx-5 p-2' border='secondary'>
                                        <Card.Img 
                                            src={`${pic.picture_path}`} 
                                            width="500px"
                                            height="300px"
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
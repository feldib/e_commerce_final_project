import React from 'react'
import { Col, Row, Carousel } from 'react-bootstrap'

function ArtworkPicturesCarousel(props) {
    return (<>
        {props.other_pictures.length > 0 &&
            <>
                <Row className='d-none d-lg-flex gx-5 gy-3 justify-content-center'>
                    {props.other_pictures.map((pic)=>{
                        return (
                            <Col lg={3}>
                                <img 
                                    src={`${pic.picture_path}`} 
                                    height="200"
                                    weight="200"
                                    style={{objectFit: "contain"}}
                                />
                            </Col>
                        )
                    })}
                </Row>

                <Row className='d-lg-none'>
                    <Carousel>
                        {props.other_pictures.map((pic)=>{
                            return (
                                <Carousel.Item>
                                    <img 
                                        src={`${pic.picture_path}`} 
                                        width="100%"
                                        style={{objectFit: "contain"}}
                                    />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Row>
            </>
        }
    </>)
}

export default ArtworkPicturesCarousel
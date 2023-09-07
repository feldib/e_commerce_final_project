import React from 'react'
import { useAxios } from '../../fetching'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Display } from 'react-bootstrap'
import BuyTable from '../../components/BuyTable'

function HomePage(props) {
    const [featuredBuyTableHidden, setFeaturedBuyTableHidden] = React.useState(false)
    const featured = useAxios("/users/recommendation/featured")
    return (
        <Container className='pb-5'>
            <Row className='pt-5 pb-5 jumbotron'>
                <h1 className='display-2 text-center'>
                    Welcome to Artworks Market{`${
                        props.loggedIn ?
                            ` ${props.user.first_name}`:
                            ""
                    }!`}
                </h1>
            </Row>

            <Row className="mb-3 d-flex justify-content-evenly">
                    <Col sx={12} md={5} lg={3} className="mb-2 mx-3">

                        <Row>
                            <Col>
                                <h4 className='text-center'>Featured</h4>
                            </Col>
                            <Col>
                                <FontAwesomeIcon 
                                    icon={
                                        !featuredBuyTableHidden ?
                                            faCaretDown :
                                            faCaretUp
                                    } 
                                    onClick={(e)=>{
                                        setFeaturedBuyTableHidden(!featuredBuyTableHidden)
                                    }}
                                />
                            </Col>                                
                        </Row>

                        {!featuredBuyTableHidden &&
                            <BuyTable 
                                reccomendation = {true}
                                theadNeeded = {false}
                                dataLines = {featured}
                                loggedIn={props.loggedIn} 
                            />
                        }
                    </Col>

                    <Col sx={12} md={5} lg={3} className="mb-2 mx-3">

                        <Row>
                            <Col>
                                <h4 className='text-center'>Featured</h4>
                            </Col>
                            <Col>
                                <FontAwesomeIcon 
                                    icon={
                                        !featuredBuyTableHidden ?
                                            faCaretDown :
                                            faCaretUp
                                    } 
                                    onClick={(e)=>{
                                        setFeaturedBuyTableHidden(!featuredBuyTableHidden)
                                    }}
                                />
                            </Col>                                
                        </Row>

                        {!featuredBuyTableHidden &&
                            <BuyTable 
                                reccomendation = {true}
                                theadNeeded = {false}
                                dataLines = {featured}
                                loggedIn={props.loggedIn} 
                            />
                        }
                    </Col>

                    <Col sx={12} md={5} lg={3} className="mb-2 mx-3">

                        <Row>
                            <Col>
                                <h4 className='text-center'>Featured</h4>
                            </Col>
                            <Col>
                                <FontAwesomeIcon 
                                    icon={
                                        !featuredBuyTableHidden ?
                                            faCaretDown :
                                            faCaretUp
                                    } 
                                    onClick={(e)=>{
                                        setFeaturedBuyTableHidden(!featuredBuyTableHidden)
                                    }}
                                />
                            </Col>                                
                        </Row>

                        {!featuredBuyTableHidden &&
                            <BuyTable 
                                reccomendation = {true}
                                theadNeeded = {false}
                                dataLines = {featured}
                                loggedIn={props.loggedIn} 
                            />
                        }
                    </Col>
            </Row>
        </Container>
    )
}

export default HomePage
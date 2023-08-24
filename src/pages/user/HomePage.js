import React from 'react'
import server_url from '../../server'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Display } from 'react-bootstrap'
import BuyTable from '../../components/BuyTable'

function HomePage(props) {
    const [featured, setFeatured] = React.useState([])
    const [featuredBuyTableHidden, setFeaturedBuyTableHidden] = React.useState(false)

    React.useEffect(()=>{
        (async()=>{
            await axios.get(`${server_url}/users/recommendation/featured`)
            .then(function (feat) {
                setFeatured(feat.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        })()
    }, [])

    return (
        <Container>
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
                            />
                        }
                    </Col>
            </Row>
        </Container>
    )
}

export default HomePage
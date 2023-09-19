import React from 'react'
import { Navbar, Nav, Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SubNavbar(props) {
    return (
        <Row>
            <a href="#subpage" className='skip-to-content'>Skip to subpage content</a>
            <Navbar>
                <Container>
                        <Nav className='subnavbar d-flex flex-wrap mx-3 justify-content-around w-100 floating-element'>
                            {props.linkObjects.map((obj)=>{
                                return (
                                    <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to={`${obj.linkTo}`}> 
                                        <Col>
                                            <Row className='text-center'>
                                                <Col>
                                                    <FontAwesomeIcon size='2xl' icon={obj.icon} />
                                                </Col>
                                            </Row>
                                            <Row className='text-center'>
                                                <Col>
                                                    <p>{obj.linkText}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Link>
                                )
                            })}
                        </Nav>
                </Container>
            </Navbar>
        </Row>
    )
}

export default SubNavbar
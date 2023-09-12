import React from 'react'
import { Navbar, Nav, Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SubNavbar(props) {
    return (
        <Row>
            <Navbar>
                <Container>
                        <Nav className='d-flex flex-wrap mx-3 justify-content-around w-100 floating-element'>
                            {props.linkObjects.map((obj)=>{
                                return (
                                    <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to={`${obj.linkTo}`}> 
                                        <Col>
                                            <Row>
                                                <FontAwesomeIcon size='2xl' icon={obj.icon} />
                                            </Row>
                                            <Row>
                                                <p>{obj.linkText}</p>
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
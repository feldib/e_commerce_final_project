import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function SubNavbar(props) {
    return (
        <Row>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="menu-items">
                        <h4 className='text-center'>{props.navbarName}</h4>
                    </Navbar.Toggle>

                    <Navbar.Collapse id="menu-items">
                        <Nav className='mx-3 justify-content-between w-100'>
                            {props.linkObjects.map((obj)=>{
                                return (
                                    <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to={`${obj.linkTo}`}> 
                                        <h3>{obj.linkText}</h3>
                                    </Link>
                                )
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Row>
    )
}

export default SubNavbar
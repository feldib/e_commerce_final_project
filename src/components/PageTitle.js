import React from 'react'
import { Col, Nav, Navbar, Row } from 'react-bootstrap'


function PageTitle(props) {
    return (
        <Row className='mb-2 mt-3 mb-3'>
            <Col xs={8} md={6} className='mx-auto mb-2 mt-3 mb-3'>
                <h1 className='text-center page-title text-decoration-underline'>{props.title}</h1>
            </Col>
        </Row>
    )
}

export default PageTitle
import React from 'react'
import { Col, Row } from 'react-bootstrap'


function PageTitle(props) {
    return (
        <Row className='mb-2 mt-5 mb-3'>
            <Col className='mx-auto'>
                <h1 className='text-center page-title'>{props.title}</h1>
            </Col>
        </Row>
    )
}

export default PageTitle
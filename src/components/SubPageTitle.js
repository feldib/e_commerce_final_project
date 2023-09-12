import React from 'react'
import { Col, Row } from 'react-bootstrap'


function SubPageTitle(props) {
    return (
        <Row className='mb-2 mt-5 mb-3'>
            <Col className='mx-auto'>
                <h2 className='text-center subpage-title'>{props.title}</h2>
            </Col>
        </Row>
    )
}

export default SubPageTitle
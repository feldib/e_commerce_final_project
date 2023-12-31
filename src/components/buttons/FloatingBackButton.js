import React from 'react'
import { Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function FloatingBackButton(props) {
    return (
        <Col style={{width: "20px"}} className='position-fixed fixed-bottom text-center mb-4 mx-auto'>
            <Button className='mb-5 floating-back-button' variant="primary" onClick={()=>{
                props.navigate(-1)
            }}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
        </Col>
    )
}

export default FloatingBackButton
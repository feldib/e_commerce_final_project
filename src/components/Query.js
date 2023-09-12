import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Col } from 'react-bootstrap'

function Query(props) {
    return (
        <Col className='floating-element mb-3 mx-auto' xs={10} md={6} >
            <p>
                <FontAwesomeIcon icon={faFilter} style={{
                    color: "red",
                    border: "2px solid red",
                    borderRadius: "10px",
                    padding: "2px"
                }} />
                <span style={{
                    margin: "10px",
                    fontSize: "1.5rem"
                }}>{props.text}</span>
                <span
                    className='mx-1'
                    style={{ cursor: "pointer" }}
                    onClick={props.remove}
                >❌</span>
            </p>
        </Col>
    )
}

export default Query
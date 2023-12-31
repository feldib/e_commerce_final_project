import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { Form, InputGroup } from 'react-bootstrap'
import {Field, ErrorMessage} from 'formik'

function InputComponent(props) {
    return (
        <Form.Group className="pb-3">
            <Form.Label>{props.label}</Form.Label>
            {props.showAsterisk &&
                <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>
            }
            <InputGroup>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={props.icon} className='mx-3'/>
                </InputGroup.Text>

                <Field 
                    className="form-control" 
                    name={props.name} 
                    type={props.type} 
                    placeholder={props.placeholder}  
                />
            </InputGroup>
            <ErrorMessage 
                component="div"
                className='input-error-message'
                name={props.name}
            />
        </Form.Group>
    )
}

export default InputComponent
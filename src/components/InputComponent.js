import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { Form, InputGroup } from 'react-bootstrap'

function InputComponent(props) {
    const asterisk = React.useRef()
    const extraCondition = props.extraCondition ? props.extraCondition : false
    React.useEffect(()=>{
        if(!extraCondition){
            asterisk.current.style.visibility = "hidden"
        }
    }, [extraCondition])
    return (
        <Form.Group className="pb-3">
            <Form.Label>{props.label}</Form.Label>
            <FontAwesomeIcon ref={asterisk} icon={faAsterisk} style={{color: "red", visibility: "hidden"}} className='mx-3'/>

            <InputGroup>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={props.icon} className='mx-3'/>
                </InputGroup.Text>
                <Form.Control name={props.name} type={props.type} placeholder={props.placeholder} 
                    onBlur={(e)=>{
                        props.changeValue(e.target.value)
                        if(e.target.value === "" || !e.target.checkValidity() || extraCondition){
                            asterisk.current.style.visibility = "visible"
                        }else{
                            asterisk.current.style.visibility = "hidden"
                        }
                    }}
                />

            </InputGroup>
        </Form.Group>
    )
}

export default InputComponent
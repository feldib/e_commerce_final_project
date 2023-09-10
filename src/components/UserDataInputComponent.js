import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faGear, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Form, InputGroup, Button } from 'react-bootstrap'
import {ErrorMessage} from 'formik'
import {toast} from 'react-toastify'
import { updateUserData } from '../fetching'


function UserDataInputComponents(props) {
    const [editing, setEditing] = React.useState(false)
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

                <Form.Control 
                    name={props.name} 
                    type={props.type} 
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    defaultValue={props.value}  
                    disabled={!editing}
                />

                {editing ?
                    <Button variant="primary" onClick={
                        (e)=>{
                            e.preventDefault()
                            if(props.error){
                                toast.error("Incorrect data", {
                                    className: "toast-error"
                                })
                            }else{
                                if(props.changeUserData){
                                    updateUserData(props.name, props.value)
                                    toast.success(`${props.label} changed successfully`, {
                                        className: "toast-success"
                                    })
                                }else{
                                    toast.success(`${props.label} changed successfully`, {
                                        className: "toast-success"
                                    })
                                    toast.warning(`This only effects the invoice!`, {
                                        className: "toast-warning"
                                    })
                                }
                                setEditing(false)
                                
                            }
                        }
                    }>
                        <FontAwesomeIcon icon={faCheck} className='mx-3'/>
                    </Button>
                :
                    <Button variant="primary" onClick={
                        ()=>{setEditing(true)}
                    }>
                        <FontAwesomeIcon icon={faGear} className='mx-3'/>
                    </Button>
                }
                

            </InputGroup>
            {props.error ?
                <div className='input-error-message'>
                    {props.error}
                </div> 
             : null}
        </Form.Group>
    )
}

export default UserDataInputComponents
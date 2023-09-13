import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, } from 'react-bootstrap'
import { toast } from 'react-toastify'

function SinglePurposeButton(props) {
    return (
        <Row>
            <p 
                style={{cursor: "pointer"}}
                onClick={
                    async()=>{
                        if(props.loggedIn){
                            props.actionOnSuccess(parseInt(props.artwork_id))
                            .then((response)=>{
                                toast.success(props.toastSuccessMessage, {
                                    className: "toast-success"
                                })
                            }).catch((error)=>{
                                toast.error(props.toastErrorMessage, {
                                    className: "toast-error"
                                })
                            })
                            
                        }else{
                            toast.warning(props.toastWarningMessage, {
                                className: "toast-warning"
                            })
                        }
                    }
                }
            >
                <FontAwesomeIcon icon={props.icon} />
            </p>
            
        </Row>
    )
}
export default SinglePurposeButton
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { Row } from 'react-bootstrap'
import { removeArtwork } from '../../fetching'
import { toast } from 'react-toastify'

function RemoveArtworkButton(props) {
    return (
        <Row>
            <p 
                style={{cursor: "pointer"}}
                onClick={
                    async()=>{
                        if(props.loggedIn){
                            removeArtwork(parseInt(props.artwork_id))
                            .then((response)=>{
                                toast.success("Artwork removed successfully", {
                                    className: "toast-success"
                                })
                            }).catch((error)=>{
                                toast.error("Error: item could not be removed", {
                                    className: "toast-error"
                                })
                            })
                            
                        }else{
                            toast.warning("Sign in as an admin to remove artwork!", {
                                className: "toast-warning"
                            })
                        }
                    }
                }
            >
                <FontAwesomeIcon icon={faX} />
            </p>
            
        </Row>
    )
}

export default RemoveArtworkButton
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBasketShopping} from '@fortawesome/free-solid-svg-icons'
import { Row, Table } from 'react-bootstrap'
import { useLoading } from '../fetching'
import { addToShoppingList } from '../fetching'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function ShoppingCartButton(props) {
    return (
        <Row>
            <p 
                style={{cursor: "pointer"}}
                onClick={
                    async()=>{
                        if(props.loggedIn){
                            addToShoppingList(parseInt(props.artwork_id))
                            .then((response)=>{
                                toast.success("Item added to shopping cart ", {
                                    className: "toast-success"
                                })
                            }).catch((error)=>{
                                toast.error("Item out of stock", {
                                    className: "toast-error"
                                })
                            })
                            
                        }else{
                            toast.warning("Sign in or register to add to shopping cart! ", {
                                className: "toast-warning"
                            })
                        }
                    }
                }
            >
                <FontAwesomeIcon icon={faBasketShopping} />
            </p>
            
        </Row>
    )
}

export default ShoppingCartButton
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBasketShopping} from '@fortawesome/free-solid-svg-icons'
import { Row, Table } from 'react-bootstrap'
import { useLoading } from '../fetching'
import { addToShoppingList } from '../fetching'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function FavouriteButton(props) {
    return (
        <Row>
            <p 
                style={{cursor: "pointer"}}
                onClick={
                    async()=>{
                        if(props.loggedIn){
                            // await addToFauforites(line.id)
                        }else{
                            toast.warning("Sign in or register to add to shopping list! ", {
                                className: "toast-warning"
                            })
                        }
                    }
                }
            >
                <FontAwesomeIcon icon={faHeart} />
            </p>
        </Row>
    )
}

export default FavouriteButton
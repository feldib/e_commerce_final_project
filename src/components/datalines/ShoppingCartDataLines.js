import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faX, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { Row, Table, Col } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import FavouriteButton from '../buttons/FavouriteButton'
import { increaseShoppingListItemQuantity, decreaseShoppingListItemQuantity, removeFromShoppingList } from '../../fetching'
import {
    increaseLocalStorageShoppingCartQuantity,
    decreaseLocalStorageShoppingCartQuantity,
    removeLocalStorageShoppingCartQuantity 
} from '../../helpers/helpers'

function ShoppingCartDataLines(props) {
    return ( 
        <tr key={props.index}>
            <td>
                <img
                    src = {props.line.thumbnail}
                    width="100"
                    height="100"
                    style={{objectFit: "cover"}}
                    alt="place of thumbnail"
                />
            </td>
            <td>
                <Link to={`/artwork_page/${props.line.id}`}>
                    <p>
                        {props.line.title}
                    </p>
                </Link>
            </td>
            <td>
                <p>
                    {props.line.artist_name}
                </p>
            </td>
            <td>
                <p>
                    €{props.line.price}
                </p>
            </td>
            <td className='text-center'>
                <Row>
                    <Col sm={12} lg={5}>
                        <Col>
                            <p>
                                {props.line.quantity}
                            </p>
                        </Col>
                    </Col>
                    <Col>
                        <p 
                            style={{cursor: "pointer"}}
                            className='table-button'
                            onClick={
                                async()=>{
                                    if(props.loggedIn){
                                        await decreaseShoppingListItemQuantity(props.line.id)
                                    }else{
                                        decreaseLocalStorageShoppingCartQuantity(props.line.id)
                                    }
                                    window.location.reload()
                                }
                            }
                        >
                            <FontAwesomeIcon icon={faMinus} style={{color: "red"}} />
                        </p>
                    </Col>
                    
                    <Col>
                        <p 
                            style={{cursor: "pointer"}}
                            className='table-button'
                            onClick={
                                async()=>{
                                    if(props.loggedIn){
                                        await increaseShoppingListItemQuantity(props.line.id).then((response)=>{
                                            toast.success("Item added to shopping cart", {
                                                className: "toast-success"
                                            })
                                            window.location.reload()
                                        }).catch((error)=>{
                                            toast.error("Item out of stock", {
                                                className: "toast-error"
                                            })
                                        })
                                    }else{
                                        try{
                                            increaseLocalStorageShoppingCartQuantity(
                                                    props.line.id, 
                                                    props.line.stored_amount - props.line.quantity
                                                )
                                            toast.success("Item added to shopping cart", {
                                                className: "toast-success"
                                            })
                                            window.location.reload()
                                        }catch(error){
                                            toast.error("Item out of stock", {
                                                className: "toast-error"
                                            })
                                        }
                                    }
                                }
                            }
                        >
                            <FontAwesomeIcon icon={faPlus} style={{color: "red"}} />
                        </p>
                    </Col>
                </Row>
            </td>
            <td className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
                <p>
                    {props.line.tags &&
                        props.line.tags
                        .map(tag => tag.tname)
                        .join(", ")
                    }
                </p>
            </td>
            <td className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
                <p>
                    {props.line.cname}
                </p>
            </td>
            <td>
                <div className='container text-center'>  
                    <Row>
                        <Col>                          
                            <FavouriteButton
                                artwork_id={props.line.id}
                                loggedIn={props.loggedIn}
                            />
                        </Col> 
                    </Row>      

                    <Row>
                        <Col>
                            <p 
                                style={{cursor: "pointer"}}
                                className='table-button'
                                onClick={
                                    async()=>{
                                        if(props.loggedIn){
                                            await removeFromShoppingList(props.line.id)
                                            window.location.reload()
                                        }else{
                                            removeLocalStorageShoppingCartQuantity(props.line.id)
                                            window.location.reload()
                                        }
                                    }
                                }
                            >
                                <FontAwesomeIcon icon={faX} style={{color: "red"}} />
                            </p>
                        </Col>
                    </Row>
                    <ToastContainer position='bottom-right'/>
                </div>
            </td>
        </tr>
    )
}

export default ShoppingCartDataLines
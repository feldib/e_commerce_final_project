import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faX, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { Row, Table, Col } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import FavouriteButton from './FavouriteButton'
import { increaseShoppingListItemQuantity, decreaseShoppingListItemQuantity, removeFromShoppingList } from '../fetching'

function ShoppingCartDataLines(props) {
    return ( 
        <tr key={props.index}>
            <td>
                <img
                        src = {props.line.thumbnail}
                        width="100"
                        style={{objectFit: "contain"}}
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
                            onClick={
                                async()=>{
                                    await decreaseShoppingListItemQuantity(props.line.id)
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
                            onClick={
                                async()=>{
                                    await increaseShoppingListItemQuantity(props.line.id)
                                    window.location.reload()
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
                <div className='container'>                                   
                    <FavouriteButton
                        artwork_id={props.line.id}
                        loggedIn={props.loggedIn}
                    />

                    <Row>
                        <p 
                            style={{cursor: "pointer"}}
                            onClick={
                                async()=>{
                                    await removeFromShoppingList(props.line.id)
                                    window.location.reload()
                                }
                            }
                        >
                            <FontAwesomeIcon icon={faX} style={{color: "red"}} />
                        </p>
                    </Row>
                    <ToastContainer position='top-right'/>
                </div>
            </td>
        </tr>
    )
}

export default ShoppingCartDataLines
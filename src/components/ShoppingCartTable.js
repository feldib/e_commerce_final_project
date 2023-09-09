import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faX, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { Row, Table, Col } from 'react-bootstrap'
import { useLoading } from '../fetching'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import FavouriteButton from './FavouriteButton'
import ShoppingCartButton from './ShoppingCartButton'


import { 
    removeFromShoppingList, 
    increaseShoppingListItemQuantity,
    decreaseShoppingListItemQuantity 
} from '../fetching'

function ShoppingCartTable(props) {
    function makeDataLines(dataLines){
        return (dataLines.map((line, index)=>{
            return (
                <tr key={index}>
                    <td>
                        <img
                                src = {line.thumbnail}
                                width="100"
                                style={{objectFit: "contain"}}
                                alt="place of thumbnail"
                            />
                    </td>
                    <td>
                        <Link to={`/artwork_page/${line.id}`}>
                            <p>
                                {line.title}
                            </p>
                        </Link>
                    </td>
                    <td>
                        <p>
                            {line.artist_name}
                        </p>
                    </td>
                    <td>
                        <p>
                            €{line.price}
                        </p>
                    </td>
                    <td className='text-center'>
                        <Row>
                            <Col sm={12} lg={5}>
                                <Col>
                                    <p>
                                        {line.quantity}
                                    </p>
                                </Col>
                            </Col>
                            <Col>
                                <p 
                                    style={{cursor: "pointer"}}
                                    onClick={
                                        async()=>{
                                            await decreaseShoppingListItemQuantity(line.id)
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
                                            await increaseShoppingListItemQuantity(line.id)
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
                            {line.tags &&
                                line.tags
                                .map(tag => tag.tname)
                                .join(", ")
                            }
                        </p>
                    </td>
                    <td className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
                        <p>
                            {line.cname}
                        </p>
                    </td>
                    <td>
                        <div className='container'>                                   
                            <FavouriteButton
                                artwork_id={line.id}
                                loggedIn={props.loggedIn}
                            />

                            <Row>
                                <p 
                                    style={{cursor: "pointer"}}
                                    onClick={
                                        async()=>{
                                            await removeFromShoppingList(line.id)
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
        })
        )
    }

    function presentData(dataLines){
        if(dataLines.length > 0){
            return makeDataLines(dataLines)
        }
        else{
            return (
                <tr>
                    <td colspan="8">
                        <h6 className='text-center'>No results</h6>
                    </td>
                </tr>
            )
        }
    }

    const dataLines = useLoading(props.dataLines, presentData)
    return (
        <Row>
            <Table className='table-hover' variant='dark'>
                {props.theadNeeded &&
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>Tags</th>
                        <th className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>Categories</th>
                        <th></th>
                    </tr>
                </thead>
                }

                <tbody>
                    {dataLines}
                </tbody>
            </Table>
        </Row>
    )
}

export default ShoppingCartTable
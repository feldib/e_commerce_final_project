import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faX, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { Row, Table, Col } from 'react-bootstrap'
import { useLoading } from '../fetching'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import FavouriteButton from './FavouriteButton'
import ShoppingCartButton from './ShoppingCartButton'
import server_url from '../server'
import ShoppingCartDataLines from './ShoppingCartDataLines'
import { 
    removeFromShoppingList, 
    increaseShoppingListItemQuantity,
    decreaseShoppingListItemQuantity,
    useAxios
} from '../fetching'

function ShoppingCartTable(props) {
    function makeDataLines(dataLines){
        return (dataLines.map((line, index)=>{
            return (
                <ShoppingCartDataLines 
                    reccomendation={props.reccomendation}
                    line={line}
                    index={index}
                    loggedIn={props.loggedIn}
                />
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
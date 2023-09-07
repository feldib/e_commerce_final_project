import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBasketShopping} from '@fortawesome/free-solid-svg-icons'
import { Row, Table } from 'react-bootstrap'
import { useLoading } from '../fetching'
import { addToShoppingList } from '../fetching'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import FavouriteButton from './FavouriteButton'
import ShoppingCartButton from './ShoppingCartButton'

function BuyTable(props) {
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
                    <td>
                        <p>
                            {line.quantity}
                        </p>
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
                            <ShoppingCartButton
                                artwork_id={props.artwork_id}
                                loggedIn={props.loggedIn}
                            />
                            <FavouriteButton
                                loggedIn={props.loggedIn}
                            />
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

export default BuyTable
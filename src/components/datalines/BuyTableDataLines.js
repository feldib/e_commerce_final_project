import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import FavouriteButton from '../../components/buttons/FavouriteButton'
import ShoppingCartButton from '../../components/buttons/ShoppingCartButton'

function BuyTableDataLines(props) {
    const [quantity, setQuantity] = React.useState(props.line.quantity)
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
                <p>
                    {quantity}
                </p>
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
                {props.orderSummary ?
                    <p>€{quantity * props.line.price}</p>
                :
                    <div className='container'>
                        <span onClick={
                            ()=>{
                                if(props.loggedIn && quantity>0){
                                    setQuantity(quantity-1)
                                }
                            }
                        }>
                            <ShoppingCartButton
                                artwork_id={props.line.id}
                                loggedIn={props.loggedIn}
                            />
                        </span>
                        <FavouriteButton
                            artwork_id={props.line.id}
                            loggedIn={props.loggedIn}
                        />
                        <ToastContainer position='top-right'/>
                    </div>
                
                }
            </td>
            
        </tr>
    )
}

export default BuyTableDataLines
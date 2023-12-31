import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import FavouriteButton from '../../components/buttons/FavouriteButton'
import ShoppingCartButton from '../../components/buttons/ShoppingCartButton'
import { UserDataContext } from '../../App'
import { server_url } from '../../utils/api_constants'
import useQuantity from '../../hooks/useQuantity'

function BuyTableDataLines(props) {

    const {loggedIn} = React.useContext(UserDataContext)

    const {quantity, setQuantity} = useQuantity(loggedIn, props.line.quantity, props.line.id)
    
    return ( 
        <tr key={props.index}>
            <td>
                <img
                    src = {`${server_url}/${props.line.thumbnail}`}
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
            <td className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
                <p>
                    {props.line.artist_name}
                </p>
            </td>
            <td>
                <p>
                    €{props.line.price}
                </p>
            </td>
            <td className={`text-center ${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
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
                                if(quantity>0){
                                    setQuantity(quantity-1)
                                }
                            }
                        }>
                            <ShoppingCartButton
                                artwork_id={props.line.id}
                                quantity={quantity}
                            />
                        </span>
                        <FavouriteButton
                            artwork_id={props.line.id}
                        />
                        <ToastContainer position='bottom-right'/>
                    </div>
                
                }
            </td>
            
        </tr>
    )
}

export default BuyTableDataLines
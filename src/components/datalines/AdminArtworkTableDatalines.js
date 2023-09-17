import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import RemoveArtworkButton from '../buttons/RemoveArtworkButton'
import FeatureButton from '../buttons/FeatureButton'

function AdminArtworkTableDatalines(props) {
    const [ lineVisible, setLineVisible ] = React.useState(true)
    const [ quantity, setQuantity ] = React.useState(props.line.quantity)

    const removeLineFromView = () => {setLineVisible(false)}

    return ( 
        <>
            {lineVisible &&
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
                    <td className={"d-none d-md-table-cell"}>
                        <p>
                            €{props.line.price}
                        </p>
                    </td>
                    <td className={"d-none d-md-table-cell"}>
                        <p>
                            {quantity}
                        </p>
                    </td>
                    <td className={"d-none d-md-table-cell"}>
                        <p>
                            {props.line.tags &&
                                props.line.tags
                                .map(tag => tag.tname)
                                .join(", ")
                            }
                        </p>
                    </td>
                    <td className={"d-none d-md-table-cell"}>
                        <p>
                            {props.line.cname}
                        </p>
                    </td>
                    <td>
                        <div className='container'>
                            <FeatureButton
                                artwork_id={props.line.id}
                                loggedIn={props.loggedIn}
                            />

                            <RemoveArtworkButton
                                artwork_id={props.line.id}
                                loggedIn={props.loggedIn}
                                removeLineFromView={removeLineFromView}
                            />
                            
                            <ToastContainer position='bottom-right'/>
                        </div>
                    </td>
                    
                </tr>
            }
        </>
    )
}

export default AdminArtworkTableDatalines
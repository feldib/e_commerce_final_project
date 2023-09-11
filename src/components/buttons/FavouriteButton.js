import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { Row } from 'react-bootstrap'
import { addToWishlisted, removeFromWishlisted, isWishlisted } from '../../fetching'
import { toast } from 'react-toastify'

function FavouriteButton(props) {
    const [wishlisted, setWishlisted] = React.useState(false)
    const [needsToBeRefreshed, setNeedsToBeRefreshed] = React.useState(false)

    React.useEffect(()=>{
        (async()=>{
            if(props.loggedIn){
                const isWishlistedOrNot = await isWishlisted(props.artwork_id)
                setWishlisted(isWishlistedOrNot)
            }
        })()
        if(needsToBeRefreshed){
            setNeedsToBeRefreshed(false)
        }
    }, [needsToBeRefreshed])

    return (   
        <Row>
            <p 
                style={{cursor: "pointer"}}
                onClick={
                    async()=>{
                        if(props.loggedIn){
                            if(wishlisted){
                                await removeFromWishlisted(props.artwork_id)
                                setNeedsToBeRefreshed(true)
                            }else{
                                await addToWishlisted(props.artwork_id)
                                setNeedsToBeRefreshed(true)
                            }
                        }else{
                            toast.warning("Sign in or register to add to shopping list! ", {
                                className: "toast-warning"
                            })
                        }
                    }
                }
            >
                {wishlisted ?
                    <FontAwesomeIcon icon={faHeartSolid}  /> 
                :
                    <FontAwesomeIcon icon={faHeartRegular}  />
                }
                
            </p>
        </Row>
    )
}

export default FavouriteButton
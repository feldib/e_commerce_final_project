import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { addToWishlisted, removeFromWishlisted, isWishlisted } from '../../fetching'
import { UserDataContext } from '../../App'
import AddOrRemoveFromButton from './AddOrRemoveButton'

function FavouriteButton(props) {
    const {user, loggedIn} = React.useContext(UserDataContext)

    return (   
        <AddOrRemoveFromButton 
            isAdded = {isWishlisted}
            addToAdded = {addToWishlisted}
            removeFromAdded = {removeFromWishlisted}
            artwork_id = {props.artwork_id}
            toastWarningMessage = "Sign in or register to add to wishlist! "
            filledButton = {<FontAwesomeIcon icon={faHeartSolid}  /> }
            regularButton = {<FontAwesomeIcon icon={faHeartRegular}  />}
        />
    )
}

export default FavouriteButton
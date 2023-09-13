import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { addToWishlisted, removeFromWishlisted, isWishlisted } from '../../fetching'

import AddOrRemoveFromButton from './AddOrRemoveButton'

function FavouriteButton(props) {
    return (   
        <AddOrRemoveFromButton 
            isAdded = {isWishlisted}
            addToAdded = {addToWishlisted}
            removeFromAdded = {removeFromWishlisted}
            loggedIn = {props.loggedIn}
            artwork_id = {props.artwork_id}
            toastWarningMessage = "Sign in or register to add to shopping list! "
            filledButton = {<FontAwesomeIcon icon={faHeartSolid}  /> }
            regularButton = {<FontAwesomeIcon icon={faHeartRegular}  />}
        />
    )
}

export default FavouriteButton
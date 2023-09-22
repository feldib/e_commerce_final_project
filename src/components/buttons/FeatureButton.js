import React from 'react'
import { addToFeatured, removeFromFeatured, isFeatured } from '../../fetching'
import AddOrRemoveFromButton from './AddOrRemoveButton'
import { UserDataContext } from '../../App'

function FeatureButton(props) {
    const {user, loggedIn} = React.useContext(UserDataContext)

    return (   
        <AddOrRemoveFromButton 
            isAdded = {isFeatured}
            addToAdded = {addToFeatured}
            removeFromAdded = {removeFromFeatured}
            artwork_id = {props.artwork_id}
            toastWarningMessage = "Sign in as an admin to add to favourites "
            filledButton = {<img 
                                src='/trophy_filled.png' 
                                height="25px"
                                alt='remove from featured'
                            /> }
            regularButton = {<img 
                                src='/trophy_regular.png' 
                                height="25px"
                                alt='add to featured'
                            />}
        />
    )
}

export default FeatureButton
import React from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { removeArtwork } from '../../fetching'
import SinglePurposeButton from './SinglePurposeButton'

function RemoveArtworkButton(props) {
    return (
        <SinglePurposeButton 
            loggedIn = {props.loggedIn}
            actionOnLoggedIn = {
                (artwork_id)=>{
                    props.removeLineFromView()
                    return removeArtwork(artwork_id)
                }
            }
            artwork_id = {props.artwork_id}
            toastSuccessMessage = "Artwork removed successfully"
            toastErrorMessage = "Error: item could not be removed"
            toastWarningMessage = "Sign in as an admin to remove artwork!"
            icon = {faX}
        />
    )
}

export default RemoveArtworkButton


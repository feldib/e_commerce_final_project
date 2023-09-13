import React from 'react'
import { faBasketShopping} from '@fortawesome/free-solid-svg-icons'
import { addToShoppingList } from '../../fetching'
import SinglePurposeButton from './SinglePurposeButton'

function ShoppingCartButton(props) {
    return (
        <SinglePurposeButton 
            loggedIn = {props.loggedIn}
            actionOnSuccess = {addToShoppingList}
            artwork_id = {props.artwork_id}
            toastSuccessMessage = "Item added to shopping cart"
            toastErrorMessage = "Item out of stock"
            toastWarningMessage = "Sign in or register to add to shopping cart!"
            icon = {faBasketShopping}
        />
    )
}

export default ShoppingCartButton
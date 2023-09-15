import React from 'react'
import { faBasketShopping} from '@fortawesome/free-solid-svg-icons'
import { addToShoppingList } from '../../fetching'
import SinglePurposeButton from './SinglePurposeButton'
import { increaseLocalStorageShoppingCartQuantity } from '../../helpers/helpers.js'


function ShoppingCartButton(props) {
    return (
        <SinglePurposeButton 
            loggedIn = {props.loggedIn}
            actionOnLoggedIn = {addToShoppingList}
            actionOnNotLoggedIn = {
                ()=>{
                    increaseLocalStorageShoppingCartQuantity(props.artwork_id, props.quantity)
                }
            }
            artwork_id = {props.artwork_id}
            toastSuccessMessage = "Item added to shopping cart"
            toastErrorMessage = "Item out of stock"
            icon = {faBasketShopping}
        />
    )
}

export default ShoppingCartButton
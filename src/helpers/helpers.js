import {
    getDataOfArtworks, 
    replaceSavedShoppingCart,
    getLoggedIn,
    getIsAdmin
} from '../fetching'

import axios from 'axios'

import { server_url } from '../utils/api_constants'

const presentData = (dataLines, makeDataLines) => {
    if(dataLines.length > 0){
        return makeDataLines(dataLines)
    }
    else{
        return (
            <tr>
                <td colspan="8">
                    <h6 className='text-center'>No results</h6>
                </td>
            </tr>
        )
    }
}

const increaseLocalStorageShoppingCartQuantity = (artwork_id, stored_amount) => {
    const shoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || []

    const existingRecordIndex = shoppingCart.findIndex((item => item.artwork_id===artwork_id))

    console.log("artwork_id: ", artwork_id)
    console.log("existingRecordIndex: ", existingRecordIndex)

    if(existingRecordIndex>=0){
            console.log("shoppingCart[existingRecordIndex].quantity", shoppingCart[existingRecordIndex].quantity)

    }
    console.log("stored amount: ", stored_amount)
    console.log()

    if(stored_amount > 0){
        if(existingRecordIndex < 0){
            shoppingCart.push({
                artwork_id,
                quantity: 1
            })
            localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart))
        }
        else if(shoppingCart[existingRecordIndex].quantity > 0){
            shoppingCart[existingRecordIndex].quantity++
            localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart))
        }else{
            throw new Error("Item is out of stock")
        }
    }else{
        throw new Error("Item is out of stock")
    }
}

const decreaseLocalStorageShoppingCartQuantity = (artwork_id) => {
    const shoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || []

    const existingRecordIndex = shoppingCart.findIndex((item => item.artwork_id===artwork_id))

    if((existingRecordIndex >= 0) && (shoppingCart[existingRecordIndex].quantity > 0)){
        if(shoppingCart[existingRecordIndex].quantity === 1){
            shoppingCart.splice(existingRecordIndex, 1)
        }else{
            shoppingCart[existingRecordIndex].quantity--
        }

        localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart))
    }
}

const removeLocalStorageShoppingCartQuantity = (artwork_id) => {
    const shoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || []

    const existingRecordIndex = shoppingCart.findIndex((item => item.artwork_id===artwork_id))

    if((existingRecordIndex >= 0) && (shoppingCart[existingRecordIndex].quantity > 0)){
        shoppingCart.splice(existingRecordIndex, 1)
        localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart))
    }
}

const getLocatStorageShoppingCart = async () => {
    let shoppingCart = localStorage.getItem("shopping_cart")
    if(!shoppingCart){
        return []
    }else{
        shoppingCart = JSON.parse(shoppingCart)
        const data = await getDataOfArtworks(shoppingCart)
        return data
    }
}

const replacePreviousShoppingCart = async () => {
    const shopping_cart = JSON.parse(localStorage.getItem("shopping_cart"))
    replaceSavedShoppingCart(shopping_cart)
    localStorage.removeItem("shopping_cart")
}

const redirectIfNotloggedIn = () => {
    getLoggedIn().catch(()=>{
        window.location.replace("/login")
    })
}

const redirectIfNotAdmin = (isAdmin) => {
    getIsAdmin().catch(()=>{
        window.location.replace("/user")
    })
}

const checkIfShoppingCartIsEmpty = async (loggedIn) => {
    if(loggedIn){
        return axios.get(`${server_url}/users/shopping_cart`)
        .then(function (results) {
            if(results.data.length){
                return true
            }else{
                return false
            }
        })
        .catch(function (error) {
            return false
        })
    }else{
        return getLocatStorageShoppingCart()
        .then((artworks_in_shopping_cart)=>{
            if(artworks_in_shopping_cart.length){
                return true
            }else{
                return false
            }
        })
        .catch(function (error) {
            return false
        })
    }
}

export {
    presentData,
    increaseLocalStorageShoppingCartQuantity,
    decreaseLocalStorageShoppingCartQuantity,
    removeLocalStorageShoppingCartQuantity,
    getLocatStorageShoppingCart,
    replacePreviousShoppingCart,
    redirectIfNotloggedIn,
    redirectIfNotAdmin,
    checkIfShoppingCartIsEmpty
}
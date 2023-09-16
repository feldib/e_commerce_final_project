import {getDataOfArtworks} from '../fetching'

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

    if(stored_amount > 0){
        if(existingRecordIndex < 0){
            shoppingCart.push({
                artwork_id,
                quantity: 1
            })
            localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart))
        }
        else if(shoppingCart[existingRecordIndex].quantity < stored_amount){
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

export {
    presentData,
    increaseLocalStorageShoppingCartQuantity,
    decreaseLocalStorageShoppingCartQuantity,
    removeLocalStorageShoppingCartQuantity,
    getLocatStorageShoppingCart
}
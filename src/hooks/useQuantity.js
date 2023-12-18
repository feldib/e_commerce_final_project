import React from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true

const useQuantity = (loggedIn, inStock, artworkId)=>{
    const [quantity, setQuantity] = React.useState(inStock)
    React.useEffect(()=>{
        
        if(!loggedIn){
            const signedOutShoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || []
            if(signedOutShoppingCart.length){
                const index = signedOutShoppingCart.findIndex((item)=>{
                    return item.artwork_id === artworkId
                })

                if(index !== -1){
                    setQuantity(
                        inStock - signedOutShoppingCart[index].quantity
                    ) 
                }
            }
            console.log("signedOutShoppingCart", JSON.stringify(signedOutShoppingCart))
        }
    }, [])

    return {quantity, setQuantity}
}

export default useQuantity
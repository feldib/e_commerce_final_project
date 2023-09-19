import React from 'react'
import { server_url } from '../utils/api_constants'
import axios from 'axios'
import { getLocatStorageShoppingCart } from '../helpers/helpers'
axios.defaults.withCredentials = true

const useShoppingList = (loggedIn) =>{
    const [data, setData] = React.useState([])
    React.useEffect(()=>{
        (async()=>{
            if(loggedIn){
                await axios.get(`${server_url}/users/shopping_cart`)
                .then(function (results) {
                    setData(results.data)
                })
                .catch(function (error) {
                    setData(false)
                    console.log(error)
                })
            }else{
                await getLocatStorageShoppingCart()
                .then((artworks_in_shopping_cart)=>{
                    setData(artworks_in_shopping_cart)
                })
                .catch(function (error) {
                    setData(false)
                })
            }
            })()
    }, [loggedIn])
    return data
}

export default useShoppingList
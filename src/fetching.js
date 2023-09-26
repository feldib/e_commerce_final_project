import { Form } from 'react-hook-form'
import { server_url, users_url, admin_url } from './utils/api_constants'
import axios from 'axios'
axios.defaults.withCredentials = true

const logOut = async()=>{
    await axios.get(`${server_url}/log_out`)
    .then(function (response) {
        window.location.replace("/")
    })
    .catch(function (error) {
        console.log(error)
    })
}

const sendForgotPasswordEmail = (email)=>{
    return axios.post(`${server_url}/forgot_password`, {email})
}

const registerNewUser = async(email, password, firstName, lastName)=>{
    return await axios.post(`${server_url}/${users_url}/new_user`, {
        last_name: lastName,
        first_name: firstName, 
        email, 
        password
    })
}

const logIn = async(email, password, settleSuccess)=>{
    await axios.post(`${server_url}/login`, {email, password})
    .then(function (response) {
        const userData = response.data
        settleSuccess(userData)
    })
}

const changePassword = async(token, email, newPassword)=>{
    return axios.post(`${server_url}/reset_password`, {
        token,
        email,
        new_password: newPassword
    })
}

const getArtworkSearchResults = async(objects, pageNumber)=>{
    const queries = Object.entries(objects).map(([key, value])=>{
        return `${key}=${value}`
    }).join("&")
    
    return axios.get(`${server_url}/search_artworks${
        queries.length ? ("?" + queries) : ""
    }${objects.n ? ("&offset=" + objects.n * (pageNumber-1)) : ""}
    `)
    .then(function (artw) {
        return artw.data
    })
    .catch(function (error) {
        console.log(error)
        return 
    })
}

const sendMessageToAdministrator = (email, title, message)=>{
    return axios.post(`${server_url}/${users_url}/message_to_administrator`, {email, title, message})
}

const addToShoppingList = (artwork_id) => {
    return axios.post(`${server_url}/${users_url}/shopping_cart`, {artwork_id})
}

const removeFromShoppingList = (artwork_id) => {
    return axios.post(`${server_url}/${users_url}/remove_item_from_shopping_cart`, {artwork_id})
}

const increaseShoppingListItemQuantity = (artwork_id) => {
    return axios.post(`${server_url}/${users_url}/increase_shopping_sart_item_quantity`, {artwork_id})
}

const decreaseShoppingListItemQuantity = (artwork_id) => {
    return axios.post(`${server_url}/${users_url}/decrease_shopping_sart_item_quantity`, {artwork_id})
}

const addToWishlisted = (artwork_id) => {
    return axios.post(`${server_url}/${users_url}/wishlisted`, {artwork_id})
}

const removeFromWishlisted = (artwork_id) => {
    return axios.post(`${server_url}/${users_url}/remove_from_wishlisted`, {artwork_id})
}

const isWishlisted = async (artwork_id) => {
    const result = await axios.post(`${server_url}/${users_url}/is_wishlisted`, {artwork_id})
    const wishlisted = result.data
    return wishlisted
}

const updateUserData = async (field_name, value) => {
    return axios.post(`${server_url}/${users_url}/update_data`, {field_name, value})
}

const updateArtworkData = async (artwork_id, field_name, value) => {
    return axios.post(`${server_url}/${admin_url}/update_artwork_data`, {artwork_id, field_name, value})
}

const order = async (invoice_data) => {
    return axios.post(`${server_url}/${users_url}/make_order`, {invoice_data})
}

const getLoggedIn = async () => {
    return axios.get(`${server_url}/logged_in`)
}

const getIsAdmin = async () => {
    return axios.get(`${server_url}/${admin_url}/is_admin`)
}

const leaveReview = async (artwork_id, title, review_text) => {
    return axios.post(`${server_url}/${users_url}/leave_review`, {artwork_id, title, review_text})
}

const approveReview = async (review_id) => {
    return axios.post(`${server_url}/${admin_url}/approve_review`, {review_id})
}

const disapproveReview = async (review_id) => {
    return axios.post(`${server_url}/${admin_url}/disapprove_review`, {review_id})
}

const replyToMessage = async (message_id, email, reply_title, reply_text) => {
    return axios.post(`${server_url}/${admin_url}/reply_to_message`, {message_id, email, reply_title, reply_text})
}

const getOrderHistory = async (user_id) => {
    return axios.post(`${server_url}/${admin_url}/get_orders_of_user`, {user_id})
}

const removeArtwork = async (artwork_id) => {
    return axios.post(`${server_url}/${admin_url}/remove_artwork`, {artwork_id})
}

const addToFeatured = (artwork_id) => {
    return axios.post(`${server_url}/${admin_url}/featured`, {artwork_id})
}

const removeFromFeatured = (artwork_id) => {
    return axios.post(`${server_url}/${admin_url}/remove_from_featured`, {artwork_id})
}

const isFeatured = async (artwork_id) => {
    const result = await axios.post(`${server_url}/${admin_url}/is_featured`, {artwork_id})
    const favourited = result.data
    return favourited
}

const addNewArtwork = (artwork) => {
    return axios.post(`${server_url}/${admin_url}/add_new_artwork`, {artwork})
}

const addNewThumbnail = (artwork_id, thumbnail) => {
    let formData = new FormData()
    
    formData.append('thumbnail', thumbnail)

    return axios.post(
        `${server_url}/${admin_url}/thumbnail?artwork_id=${artwork_id}`, 
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }  
    )
}

const addNewOtherPictures = (artwork_id, other_pictures) => {

    return Promise.all(other_pictures.map(async (picture) => {
        let formData = new FormData()
    
        formData.append('picture', picture)

        await axios.post(
            `${server_url}/${admin_url}/picture?artwork_id=${artwork_id}`, 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )  

    }))

}

const addNewOtherPicture = async(artwork_id, picture) => {

    let formData = new FormData()

    formData.append('picture', picture)

    await axios.post(
        `${server_url}/${admin_url}/picture?artwork_id=${artwork_id}`, 
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    )  

}

const removePicture = async(artwork_id, file_name) => {
    await axios.post(
        `${server_url}/${admin_url}/remove_picture`, 
        {artwork_id, file_name},
    )  

}

const getDataOfArtworks = async (shoppingCart) => {
    const results = await Promise.all(
        shoppingCart.map(async(item)=>{
            const results = await axios.get(`${server_url}/find_artwork_by_id?artwork_id=${item.artwork_id}`)
            const resObj = {
                stored_amount: results.data.quantity,
                ...results.data,
                quantity: item.quantity
            }
            return resObj
        })
    )
    return results
}

const replaceSavedShoppingCart = (shopping_cart) => {
    return axios.post(`${server_url}/${users_url}/replace_saved_shopping_cart`, {shopping_cart})
}

const replaceThumbnail = (artwork_id, thumbnail) => {
    let formData = new FormData()
    
    formData.append('thumbnail', thumbnail)

    return axios.post(
        `${server_url}/${admin_url}/replace_thumbnail?artwork_id=${artwork_id}`, 
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }  
    )
}

export {
    logOut,
    sendForgotPasswordEmail,
    registerNewUser,
    logIn,
    changePassword,
    getArtworkSearchResults,
    sendMessageToAdministrator,
    addToShoppingList,
    removeFromShoppingList,
    increaseShoppingListItemQuantity,
    decreaseShoppingListItemQuantity,
    addToWishlisted,
    removeFromWishlisted,
    isWishlisted,
    updateUserData,
    order,
    getLoggedIn,
    leaveReview,
    approveReview,
    disapproveReview,
    replyToMessage,
    getOrderHistory,
    removeArtwork,
    addToFeatured, 
    removeFromFeatured, 
    isFeatured,
    addNewArtwork,
    getDataOfArtworks,
    replaceSavedShoppingCart,
    getIsAdmin,
    updateArtworkData,
    addNewThumbnail,
    addNewOtherPictures,
    addNewOtherPicture,
    replaceThumbnail,
    removePicture
}
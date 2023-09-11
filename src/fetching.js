import {server_url, users_url} from './utils/api_constants'
import axios from 'axios'

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
        console.log("login response.data: ", response.data)
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

const getArtworkSearchResults = async(queries, setter)=>{
    axios.get(`${server_url}/search_artworks${`?${queries.join("&")}`}`)
    .then(function (artw) {
        setter(artw.data)
    })
    .catch(function (error) {
        console.log(error)
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

const order = async (invoice_data) => {
    return axios.post(`${server_url}/${users_url}/make_order`, {invoice_data})
}

const getLoggedIn = async () => {
    return axios.get(`${server_url}/logged_in`)
}

const leaveReview = async (artwork_id, title, review_text) => {
    return axios.post(`${server_url}/${users_url}/leave_review`, {artwork_id, title, review_text})
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
    leaveReview
}
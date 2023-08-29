import React from 'react'
import server_url from './server'
import axios from 'axios'

const useAxios = (url)=>{
    const [data, setData] = React.useState()
    React.useEffect(()=>{
        (async()=>{
            await axios.get(`${server_url}${url}`)
            .then(function (results) {
                setData(results.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        })()
    }, [])

    return data
}

const logOut = async()=>{
    await axios.get(`${server_url}/log_out`)
    .then(function (response) {
        window.location.replace("/")
    })
    .catch(function (error) {
        console.log(error)
    })
}

const sendForgotPasswordEmail = async(email)=>{
    axios.post(`${server_url}/forgot_password`, {email})
    .catch(function (error) {
        console.log(error)
    })
}

const registerNewUser = async(email, password, firstName, lastName, address, phone)=>{
    return await axios.post(`${server_url}/users/new_user`, {
        last_name: lastName,
        first_name: firstName, 
        email, 
        password, 
        address, 
        phone_number: phone
    })
}

const logIn = async(email, password, settleSuccess)=>{
    await axios.post(`${server_url}/login`, {email, password})
    .then(function (response) {
        console.log("login response.data: ", response.data)
        if(response.data){
            const userData = response.data
            settleSuccess(userData)
        }else{
            throw Error("Wrong email or password")
        }
    })
    .catch(function (error) {
        console.log(error)
    })
}

const changePassword = async(token, email, newPassword)=>{
    axios.post(`${server_url}/reset_password`, {
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

export {
    useAxios,
    logOut,
    sendForgotPasswordEmail,
    registerNewUser,
    logIn,
    changePassword,
    getArtworkSearchResults,
}
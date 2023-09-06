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
                setData(false)
                console.log(error)
            })
        })()
    }, [])

    return data
}

const useLoading = (data, makeJSX)=>{
    const spinner = (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
        </div>
    )

    const [result, setResult] = React.useState(spinner)
    React.useEffect(()=>{
        if(data){
            setResult(
                makeJSX(data)
            )
        }else{
            setResult(
                spinner
            )
        }
    },[data])
    
    return result
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

const sendForgotPasswordEmail = (email)=>{
    return axios.post(`${server_url}/forgot_password`, {email})
}

const registerNewUser = async(email, password, firstName, lastName)=>{
    return await axios.post(`${server_url}/users/new_user`, {
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
    return axios.post(`${server_url}/users/message_to_administrator`, {email, title, message})
}

export {
    useAxios,
    useLoading,
    logOut,
    sendForgotPasswordEmail,
    registerNewUser,
    logIn,
    changePassword,
    getArtworkSearchResults,
    sendMessageToAdministrator
}
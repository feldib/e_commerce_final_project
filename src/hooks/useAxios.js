import React from 'react'
import { server_url } from '../utils/api_constants'
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

export default useAxios
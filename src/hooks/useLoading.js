import React from 'react'

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

export default useLoading
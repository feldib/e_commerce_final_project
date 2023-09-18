import React from 'react'
import { Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

function AddOrRemoveFromButton(props) {
    const [added, setAdded] = React.useState(false)
    const [needsToBeRefreshed, setNeedsToBeRefreshed] = React.useState(false)

    React.useEffect(()=>{
        (async()=>{
            if(props.loggedIn){
                try{
                    const isAddedOrNot = await props.isAdded(props.artwork_id)
                    setAdded(isAddedOrNot)
                }catch{
                    console.log("Not authenticated")
                }
                
            }
        })()
        if(needsToBeRefreshed){
            setNeedsToBeRefreshed(false)
        }
    }, [needsToBeRefreshed])

    return (   
        <Row className='py-2'>
            <span 
                className='table-button'
                style={{cursor: "pointer"}}
                onClick={
                    async()=>{
                        if(props.loggedIn){
                            if(added){
                                await props.removeFromAdded(props.artwork_id)
                                setNeedsToBeRefreshed(true)
                            }else{
                                await props.addToAdded(props.artwork_id)
                                setNeedsToBeRefreshed(true)
                            }
                        }else{
                            toast.warning(props.toastWarningMessage, {
                                className: "toast-warning"
                            })
                        }
                    }
                }
            >
                {added ?
                    <>{props.filledButton}</>
                :
                    <>{props.regularButton}</> 
                }
                
            </span>
        </Row>
    )
}

export default AddOrRemoveFromButton


import React from 'react'
import { Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { UserDataContext } from '../../App.js'

function AddOrRemoveFromButton(props) {
    const {user, loggedIn} = React.useContext(UserDataContext)

    const [added, setAdded] = React.useState(false)
    const [needsToBeRefreshed, setNeedsToBeRefreshed] = React.useState(false)

    React.useEffect(()=>{
        (async()=>{
            if(loggedIn){
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
                        if(loggedIn){
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


import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons'
import { Row } from 'react-bootstrap'
import { addToFeatured, removeFromFeatured, isFeatured } from '../../fetching'
import { toast } from 'react-toastify'

function FeatureButton(props) {
    const [featured, setFeatured] = React.useState(false)
    const [needsToBeRefreshed, setNeedsToBeRefreshed] = React.useState(false)

    React.useEffect(()=>{
        (async()=>{
            if(props.loggedIn){
                const isFeaturedOrNot = await isFeatured(props.artwork_id)
                setFeatured(isFeaturedOrNot)
            }
        })()
        if(needsToBeRefreshed){
            setNeedsToBeRefreshed(false)
        }
    }, [needsToBeRefreshed])

    return (   
        <Row className='py-2'>
            <span 
                style={{cursor: "pointer"}}
                onClick={
                    async()=>{
                        if(props.loggedIn){
                            if(featured){
                                await removeFromFeatured(props.artwork_id)
                                setNeedsToBeRefreshed(true)
                            }else{
                                await addToFeatured(props.artwork_id)
                                setNeedsToBeRefreshed(true)
                            }
                        }else{
                            toast.warning("Sign in as an admin to add to favourites ", {
                                className: "toast-warning"
                            })
                        }
                    }
                }
            >
                {featured ?
                    <img 
                        src='/trophy_filled.png' 
                        height="25px"
                    /> 
                :
                    <img 
                        src='/trophy_regular.png' 
                        height="25px"
                    /> 
                }
                
            </span>
        </Row>
    )
}

export default FeatureButton
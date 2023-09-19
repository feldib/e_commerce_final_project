import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import useLoading from '../../hooks/useLoading'
import useAxios from '../../hooks/useAxios'
import ArtworkDetails from '../../components/ArtworkDetails'
import FloatingBackButton from '../../components/buttons/FloatingBackButton'


function ArtworkPage(props) {
    const navigatedFromRouter = !(useLocation().key === "default")
    
    const navigate = useNavigate()

    const {artwork_id} = useParams()

    const artworkData = useAxios(`/artwork?id=${artwork_id}`)

    const artwork = useLoading(artworkData, (artwork)=>{
        return (
            <ArtworkDetails 
                artwork = {artwork}
                artwork_id = {artwork_id}
                loggedIn = {props.loggedIn}
            />
        )
    })

    return (
        <Container className='pb-5 mb-5'>
            {artwork}

            {navigatedFromRouter &&
                <FloatingBackButton 
                    navigate={navigate}
                />
            }
        </Container>
    )
}

export default ArtworkPage
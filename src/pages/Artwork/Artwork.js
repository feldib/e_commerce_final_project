import React from 'react'
import { Row, Container, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useLoading from '../../hooks/useLoading'
import useAxios from '../../hooks/useAxios'
import ArtworkDetails from '../../components/ArtworkDetails'

function ArtworkPage(props) {
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
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Artwork details</h1>
            </Row>

            {artwork}

        </Container>
    )
}

export default ArtworkPage
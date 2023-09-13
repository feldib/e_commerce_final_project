import React from 'react'
import { Container } from 'react-bootstrap'
import PageTitle from '../../../components/PageTitle'
import ArtworkSearchComponent from '../../../components/input/ArtworkSearchComponent'

function Search(props) {

    return (
        <Container className='pb-5 mb-5'>
            <PageTitle 
                title="Artworks"
            />

        <ArtworkSearchComponent 
            loggedIn={props.loggedIn}
            admin={true}
        />

        </Container>            
    )
}

export default Search
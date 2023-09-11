import React from 'react'
import useAxios from '../../hooks/useAxios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container } from 'react-bootstrap'
import { users_url } from '../../utils/api_constants'
import ReccomendationTable from '../../components/tables/ReccomendationTable'

function HomePage(props) {   
    return (
        <Container className='pb-5'>
            <Row className='pt-5 pb-5 jumbotron'>
                <h1 className='display-2 text-center'>
                    Welcome to Artworks Market{`${
                        props.loggedIn ?
                            ` ${props.user.first_name}`:
                            ""
                    }!`}
                </h1>
            </Row>

            <Row className="mb-3 d-flex justify-content-evenly">
                <ReccomendationTable 
                    title="Featured"
                    path="/featured?reccomdendation=true"
                    loggedIn={props.loggedIn} 
                />

                {props.loggedIn &&
                    <ReccomendationTable 
                        title="Wishlisted"
                        path={`/${users_url}/wishlisted?reccomdendation=true`}
                        loggedIn={props.loggedIn} 
                    />
                }
                
            </Row>
        </Container>
    )
}

export default HomePage
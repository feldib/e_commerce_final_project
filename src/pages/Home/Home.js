import React from 'react'
import { Row, Container } from 'react-bootstrap'
import { users_url } from '../../utils/api_constants'
import ReccomendationTable from '../../components/tables/ReccomendationTable'
import { UserDataContext } from '../../App'

function HomePage(props) {   
    const {user, loggedIn} = React.useContext(UserDataContext)
    return (
        <Container className='px-3 pb-5'>
            <Row className='mx-auto mt-5 mb-5 jumbotron'>
                <h1 className='display-2 text-center page-title'>
                    Welcome to Artworks Market{`${
                        loggedIn ?
                            ` ${user.first_name}`:
                            ""
                    }!`}
                </h1>
            </Row>

            <Row className="mx-auto mb-3 d-flex justify-content-evenly">
                <ReccomendationTable 
                    title="Featured"
                    path="/featured?n=2"
                />

                <ReccomendationTable 
                    title="Newest"
                    path="/newest?n=2"
                />

                <ReccomendationTable 
                    title="Most wishlisted"
                    path="/most_wishlisted?n=2"
                />

                {loggedIn &&
                    <ReccomendationTable 
                        title="Wishlisted"
                        path={`/${users_url}/wishlisted?n=2`}
                    />
                }
                
            </Row>
        </Container>
    )
}

export default HomePage
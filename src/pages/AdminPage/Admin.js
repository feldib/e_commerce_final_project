import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import SubNavbar from '../../components/navbars/SubNavbar'
import { faMessage, faStar, faPerson, faPalette, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import PageTitle from '../../components/PageTitle';
import { redirectIfNotloggedIn, redirectIfNotAdmin } from '../../helpers/helpers'

function AdminPage(props) {
    redirectIfNotloggedIn()
    redirectIfNotAdmin()

    return (
        <Container className='pb-5'>
            <PageTitle title="Admin page" />

            <SubNavbar 
                navbarName="Admin pages"
                linkObjects={[
                    {linkText:"Artworks",  linkTo:"artworks", icon: faPalette},
                    {linkText:"Users",  linkTo:"users", icon: faPerson},
                    {linkText:"Orders",  linkTo:"orders", icon: faClockRotateLeft},
                    {linkText:"Reviews",  linkTo:"reviews", icon: faStar},
                    {linkText:"Messages",  linkTo:"messages", icon: faMessage}
                ]}
            />

            <Row className='pb-5'>
                <Outlet />

            </Row>
        </Container>
    )
}

export default AdminPage
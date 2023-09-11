import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import SubNavbar from '../../components/navbars/SubNavbar'
import { faMessage, faStar, faPerson, faPalette, faArrowRotateBack } from '@fortawesome/free-solid-svg-icons'

function AdminPage(props) {
    return (
        <Container className='pb-5'>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Admin page</h1>
            </Row>

            <SubNavbar 
                navbarName="Admin pages"
                linkObjects={[
                    {linkText:"Artworks",  linkTo:"artworks", icon: faPalette},
                    {linkText:"Users",  linkTo:"users", icon: faPerson},
                    {linkText:"Orders",  linkTo:"orders", icon: faArrowRotateBack},
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
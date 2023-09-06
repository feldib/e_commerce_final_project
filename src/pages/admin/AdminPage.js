import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import SubNavbar from '../../components/SubNavbar';
import { faMessage, faStar, faPerson, faPalette, faArrowRotateBack } from '@fortawesome/free-solid-svg-icons'

function AdminPage() {
    return (
        <Container className='pb-5'>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Admin page</h1>
            </Row>

            <SubNavbar 
                navbarName="Admin pages"
                linkObjects={[
                    {linkText:"Artworks",  linkTo:"", icon: faPalette},
                    {linkText:"Users",  linkTo:"", icon: faPerson},
                    {linkText:"Orders",  linkTo:"", icon: faArrowRotateBack},
                    {linkText:"Reviews",  linkTo:"", icon: faStar},
                    {linkText:"Messages",  linkTo:"", icon: faMessage}
                ]}
            />

            <Row className='pb-5'>
                <Outlet />

            </Row>
        </Container>
    )
}

export default AdminPage
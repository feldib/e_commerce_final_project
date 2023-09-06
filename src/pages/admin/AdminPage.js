import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import SubNavbar from '../../components/SubNavbar';

function AdminPage() {
    return (
        <Container className='pb-5'>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Admin page</h1>
            </Row>

            <SubNavbar 
                navbarName="Admin pages"
                linkObjects={[
                    {linkText:"Artworks",  linkTo:""},
                    {linkText:"Users",  linkTo:""},
                    {linkText:"Orders",  linkTo:""},
                    {linkText:"Reviews",  linkTo:""},
                    {linkText:"Messages",  linkTo:""}
                ]}
            />

            <Row className='pb-5'>
                <Outlet />

            </Row>
        </Container>
    )
}

export default AdminPage
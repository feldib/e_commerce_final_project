import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import SubNavbar from '../../components/SubNavbar'
import { faStar, faHeart, faInfoCircle, faArrowRotateBack, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

function ProfilePage(props) {
    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>{props.user.first_name}'s page</h1>
            </Row>

            <SubNavbar 
                navbarName="User pages"
                linkObjects={[
                    {linkText:"User Data",  linkTo:"data", icon: faInfoCircle},
                    {linkText:"Order History",  linkTo:"order_history", icon: faArrowRotateBack},
                    {linkText:"Wishlist",  linkTo:"wishlist", icon: faHeart},
                    {linkText:"Shopping Cart",  linkTo:"/shopping_cart", icon: faShoppingCart},
                ]}
            />

            <Row>
                <Outlet />
            </Row>
        </Container>
    )
}

export default ProfilePage
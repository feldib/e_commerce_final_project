import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import SubNavbar from '../../components/navbars/SubNavbar'
import { faStar, faHeart, faInfoCircle, faClockRotateLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import PageTitle from '../../components/PageTitle'
import { redirectIfNotloggedIn } from '../../helpers/helpers'

function ProfilePage(props) {
    redirectIfNotloggedIn()
    
    return (
        <Container>
             <PageTitle 
                title={`${props.user.first_name}'s page`}
            />

            <SubNavbar 
                navbarName="User pages"
                linkObjects={[
                    {linkText:"User Data",  linkTo:"data", icon: faInfoCircle},
                    {linkText:"Order History",  linkTo:"order_history", icon: faClockRotateLeft},
                    {linkText:"Wishlist",  linkTo:"wishlist", icon: faHeart},
                    {linkText:"Reviews",  linkTo:"reviews", icon: faStar},
                    {linkText:"Shopping Cart",  linkTo:"shopping_cart", icon: faShoppingCart},
                ]}
            />

            <Row className='pb-5'>
                <Outlet />
            </Row>
        </Container>
    )
}

export default ProfilePage
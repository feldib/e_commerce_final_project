import React from 'react'
import { Link } from 'react-router-dom'

function UserNavbarMenuItems(props) {
    return (
        <>
            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/shopping_cart">
                Shopping cart
            </Link>

            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/user">
                {props.first_name}
            </Link>
        </>
    )
}

export default UserNavbarMenuItems
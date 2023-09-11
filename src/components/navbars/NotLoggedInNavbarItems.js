import React from 'react'
import { Link } from 'react-router-dom'

function NotLoggedInNavbarItems() {
        return (
        <>
            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login">
                Log in
            </Link>

            <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/register">
                Register
            </Link>
        </>
    )
}

export default NotLoggedInNavbarItems
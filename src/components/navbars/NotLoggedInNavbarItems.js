import React from 'react'
import { Link } from 'react-router-dom'
import { ExpandedNavContext } from './Header'

function NotLoggedInNavbarItems() {
    const {closeExpandedNav} = React.useContext(ExpandedNavContext)

    return (
        <>
            <Link 
                onClick = {closeExpandedNav}
                className='nav-link' 
                style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login"
            >
                Log in
            </Link>

            <Link 
                onClick = {closeExpandedNav}
                className='nav-link' 
                style={{ color: 'inherit', textDecoration: 'inherit'}} 
                to="/register"
            >
                Register
            </Link>
        </>
    )
}

export default NotLoggedInNavbarItems
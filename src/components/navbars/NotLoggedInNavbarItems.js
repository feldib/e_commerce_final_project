import React from 'react'
import { Link } from 'react-router-dom'

function NotLoggedInNavbarItems(props) {
        return (
        <>
            <Link 
                onClick = {()=>props.closeExpandedNav()}
                className='nav-link' 
                style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login"
            >
                Log in
            </Link>

            <Link 
                onClick = {()=>props.closeExpandedNav()}
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
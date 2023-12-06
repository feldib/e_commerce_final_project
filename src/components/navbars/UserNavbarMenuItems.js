import React from 'react'
import { Link } from 'react-router-dom'
import { ExpandedNavContext } from './Header'

function UserNavbarMenuItems(props) {
    const {closeExpandedNav} = React.useContext(ExpandedNavContext)
    
    return (
        <>
            <Link 
                onClick = {closeExpandedNav}
                className='nav-link' 
                style={{ color: 'inherit', textDecoration: 'inherit'}} 
                to="/user"
            >
                {props.first_name}
            </Link>
        </>
    )
}

export default UserNavbarMenuItems
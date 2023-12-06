import React from 'react'
import UserNavbarMenuItems from '../navbars/UserNavbarMenuItems'
import { logOut } from '../../fetching'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { UserDataContext } from '../../App.js'
import { ExpandedNavContext } from './Header.js'

function LoggedInNavbarItems() {
    const {user, loggedIn} = React.useContext(UserDataContext)
    const {closeExpandedNav} = React.useContext(ExpandedNavContext)

    return (
        <>
            {user && !user.is_admin ?
                <UserNavbarMenuItems 
                    first_name={user.first_name}
                />
            :
                <Link 
                    onClick = {closeExpandedNav}
                    className='nav-link' 
                    style={{ color: 'inherit', textDecoration: 'inherit'}} 
                    to="/admin"
                >
                    Admin Page
                </Link>
            }
            
            <Nav.Link
                onClick={async()=>{
                    closeExpandedNav()
                    await logOut()
                }}
            >
                Log out
            </Nav.Link>
        </>
    )
}

export default LoggedInNavbarItems;
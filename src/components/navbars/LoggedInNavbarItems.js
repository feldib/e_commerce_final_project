import React from 'react'
import UserNavbarMenuItems from '../navbars/UserNavbarMenuItems'
import { logOut } from '../../fetching'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { UserDataContext } from '../../App.js'

function LoggedInNavbarItems(props) {
    const {user, loggedIn} = React.useContext(UserDataContext)

    return (
        <>
            {user && !user.is_admin ?
                <UserNavbarMenuItems 
                    first_name={user.first_name}
                    closeExpandedNav = {props.closeExpandedNav}
                />
            :
                <Link 
                    onClick = {()=>props.closeExpandedNav()}
                    className='nav-link' 
                    style={{ color: 'inherit', textDecoration: 'inherit'}} 
                    to="/admin"
                >
                    Admin Page
                </Link>
            }
            
            <Nav.Link
                onClick={async()=>{
                    props.closeExpandedNav()
                    await logOut()
                }}
            >
                Log out
            </Nav.Link>
        </>
    )
}

export default LoggedInNavbarItems;
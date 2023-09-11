import React from 'react'
import UserNavbarMenuItems from '../navbars/UserNavbarMenuItems'
import { logOut } from '../../fetching'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

function LoggedInNavbarItems(props) {
    return (
        <>
            {props.user && !props.user.is_admin ?
                <UserNavbarMenuItems 
                    first_name={props.first_name}
                />
            :
                <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/admin">
                    Admin Page
                </Link>
            }
            
            <Nav.Link
                onClick={async()=>{
                    await logOut()
                }}
            >
                Log out
            </Nav.Link>
        </>
    )
}

export default LoggedInNavbarItems;
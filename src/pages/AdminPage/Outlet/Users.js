import React from 'react'
import { Col, Row } from 'react-bootstrap'
import useAxios from '../../../hooks/useAxios'
import useLoading from '../../../hooks/useLoading'
import { admin_url } from '../../../utils/api_constants'
import UserTable from '../../../components/tables/UserTable'


function Users(props) {

    const users = useAxios(`/${admin_url}/users`)
    const usersRepresented = useLoading(users, (users)=>{
        return (
            <UserTable users={users} />
        )
    })
    return (
        <Col>
            <Row className='floating-element'>
                {usersRepresented}
            </Row>
        </Col>
    )
}

export default Users
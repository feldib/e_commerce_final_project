import React from 'react'
import UserTableDataLines from '../datalines/UserTableDataLines'
import useLoading from '../../hooks/useLoading'
import { Row } from 'react-bootstrap'
import { presentData } from '../../helpers/helpers'

function UserTable(props) {
    function makeDataLines(dataLines){
        return (dataLines.map((line, index)=>{
            return (
                <UserTableDataLines 
                    line={line}
                />
            )
        })
        )
    }

    const dataLines = useLoading(props.users, (dataLines)=>{return presentData(dataLines, makeDataLines)})
    return (
        <Row className='text-center'>
            <table classname='mb-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="d-none d-md-table-cell">Address</th>
                        <th className="d-none d-md-table-cell">Phone number</th>
                    </tr>
                </thead>

                <tbody>
                    {dataLines}
                </tbody>
            </table>
        </Row>
    )
}

export default UserTable
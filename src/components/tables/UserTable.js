import React from 'react'
import UserTableDataLines from '../datalines/UserTableDataLines'
import useLoading from '../../hooks/useLoading'
import { Row } from 'react-bootstrap'

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

    function presentData(dataLines){
        if(dataLines.length > 0){
            return makeDataLines(dataLines)
        }
        else{
            return (
                <tr>
                    <td colspan="8">
                        <h6 className='text-center'>No results</h6>
                    </td>
                </tr>
            )
        }
    }

    const dataLines = useLoading(props.users, presentData)
    return (
        <Row>
            <table classname='mb-5'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone number</th>
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
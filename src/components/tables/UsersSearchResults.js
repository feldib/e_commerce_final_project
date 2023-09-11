import React from 'react'
import { Row, Table } from 'react-bootstrap'

function UsersSearchResults() {
    return (  
        <Row>
            <Row className='mb-3 mt-5'>
                <h3 className='text-center'>Search results</h3>
            </Row>

            <Row>
                <Table className='table-hover'>
                    <thead>
                        <tr>
                            <th>First name(s)</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Address</th>
                            <th>Phone</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <h6 
                                    style={{
                                        cursor: "pointer",
                                        textDecoration: "underlined"
                                    }}
                                >Michelangelo</h6>
                            </td>

                            <td>
                                Buonarotti
                            </td>

                            <td>
                                mike@losangeles.com
                            </td>

                            <td>
                                ********
                            </td>

                            <td>
                                Firenze, Via Garibaldi 2
                            </td>

                            <td>
                                +44 31 770 7777
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h6 
                                    style={{
                                        cursor: "pointer",
                                        textDecoration: "underlined"
                                    }}
                                >Michelangelo</h6>
                            </td>

                            <td>
                                Buonarotti
                            </td>

                            <td>
                                mike@losangeles.com
                            </td>

                            <td>
                                ********
                            </td>

                            <td>
                                Firenze, Via Garibaldi 2
                            </td>

                            <td>
                                +44 31 770 7777
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Row>
    )
}

export default UsersSearchResults
import React from 'react'
import { Row, Table } from 'react-bootstrap'
import useLoading from '../../hooks/useLoading'
import AdminArtworkTableDatalines from '../datalines/AdminArtworkTableDatalines'

function AdminArtworkTable(props) {
    function makeDataLines(dataLines){
        return (dataLines.map((line, index)=>{
            return (
                <AdminArtworkTableDatalines 
                    line={line}
                    index={index}
                    loggedIn={props.loggedIn}
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

    const dataLines = useLoading(props.dataLines, presentData)

    return (
        <Row>
            <table classname='mb-5'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th className={"d-none d-md-table-cell"}>Price</th>
                        <th className={"d-none d-md-table-cell"}>Quantity</th>
                        <th className={"d-none d-md-table-cell"}>Tags</th>
                        <th className={"d-none d-md-table-cell"}>Categories</th>  
                        <th></th>                      
                    </tr>
                </thead>

                <tbody>
                    {dataLines}
                </tbody>
            </table>
        </Row>
    )
}

export default AdminArtworkTable
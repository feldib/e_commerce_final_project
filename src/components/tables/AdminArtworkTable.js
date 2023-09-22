import React from 'react'
import { Row } from 'react-bootstrap'
import useLoading from '../../hooks/useLoading'
import AdminArtworkTableDatalines from '../datalines/AdminArtworkTableDatalines'
import { presentData } from '../../helpers/helpers'

function AdminArtworkTable(props) {


    function makeDataLines(dataLines){
        return (dataLines.map((line, index)=>{
            return (
                <AdminArtworkTableDatalines 
                    line={line}
                    index={index}
                />
            )
        })
        )
    }

    const dataLines = useLoading(props.dataLines, (dataLines)=>{return presentData(dataLines, makeDataLines)})

    return (
        <Row className='text-center mx-auto'>
            <table classname='mb-3'>
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
import React from 'react'
import { Row, Table } from 'react-bootstrap'
import useLoading from '../../hooks/useLoading'
import ShoppingCartDataLines from '../datalines/ShoppingCartDataLines'
import { presentData } from '../../helpers/helpers'

function ShoppingCartTable(props) {
    function makeDataLines(dataLines){
        return (dataLines.map((line, index)=>{
            return (
                <ShoppingCartDataLines 
                    reccomendation={props.reccomendation}
                    line={line}
                    index={index}
                    loggedIn={props.loggedIn}
                />
            )
        })
        )
    }
    const dataLines = useLoading(props.dataLines, (dataLines)=>{return presentData(dataLines, makeDataLines)})
    return (
        <Row>
            <table>
                {props.theadNeeded &&
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Total cost</th>
                        <th>Quantity</th>
                        <th className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>Tags</th>
                        <th className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>Categories</th>
                        <th></th>
                    </tr>
                </thead>
                }

                <tbody>
                    {dataLines}
                </tbody>
            </table>
        </Row>
    )
}

export default ShoppingCartTable
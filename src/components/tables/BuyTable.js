import React from 'react'
import { Row, Table } from 'react-bootstrap'
import useLoading from '../../hooks/useLoading'
import BuyTableDataLines from '../datalines/BuyTableDataLines'
import { presentData } from '../../helpers/helpers'

function BuyTable(props) {
    function makeDataLines(dataLines){
        return (dataLines.map((line, index)=>{
            return (
                <BuyTableDataLines 
                    reccomendation={props.reccomendation}
                    line={line}
                    index={index}
                    loggedIn={props.loggedIn}
                    orderSummary={props.orderSummary}
                    totalCost={props.totalCost}
                />
            )
        })
        )
    }

    const dataLines = useLoading(props.dataLines, (dataLines)=>{return presentData(dataLines, makeDataLines)})

    return (
        <Row>
            <table className='mb-5'>
                {props.theadNeeded &&
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>Tags</th>
                        <th className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>Categories</th>
                        <th>{props.orderSummary && "Total Cost" }</th>
                        
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

export default BuyTable
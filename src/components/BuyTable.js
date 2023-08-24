import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBasketShopping, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Row, Table } from 'react-bootstrap'

function BuyTable(props) {
    return (
        <Row>
            <Table className='table-hover'>
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
                        <th></th>
                    </tr>
                </thead>
                }

                <tbody>
                {props.dataLines.map((line, index)=>{
                    return (
                        <tr key={index}>
                            <td>
                                <img
                                        src = {line.thumbnail}
                                        width="100"
                                        style={{objectFit: "contain"}}
                                        alt="place of thumbnail"
                                    />
                            </td>
                            <td>
                                {line.title}
                            </td>
                            <td>
                                {line.artist_name}
                            </td>
                            <td>
                                €{line.price}
                            </td>
                            <td>
                                {line.quantity}
                            </td>
                            <td className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
                                {line.tags &&
                                    line.tags
                                    .map(tag => tag.tname)
                                    .join(", ")
                                }
                            </td>
                            <td className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
                                {line.cname}
                            </td>
                            <td>
                                <div className='container'>
                                    <Row>
                                        <p style={{cursor: "pointer"}}>
                                            <FontAwesomeIcon icon={faBasketShopping} />
                                        </p>
                                    </Row>
                                    <Row>
                                        <p style={{cursor: "pointer"}}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </p>
                                    </Row>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Row>
    )
}

export default BuyTable
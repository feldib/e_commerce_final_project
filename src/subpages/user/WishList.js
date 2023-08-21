import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { Table, Row, Col } from 'react-bootstrap'

function WishList() {
    return (
        <Col>
            <Row>
                <Table className='table-hover'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Price (€)</th>
                            <th>Tags</th>
                            <th>Categories</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img 
                                        src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                        height="100"
                                        weight="100"
                                        style={{objectFit: "contain"}}
                                    />
                            </td>
                            <td>
                                Birth of Venus
                            </td>
                            <td>
                                Boticelli
                            </td>
                            <td>
                                45
                            </td>
                            <td>
                                Renessaince, Classic, Replica
                            </td>
                            <td>
                                Painting, Oil Painting
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
                                            <FontAwesomeIcon icon={faX} />
                                        </p>
                                    </Row>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img 
                                        src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                        height="100"
                                        weight="100"
                                        style={{objectFit: "contain"}}
                                    />
                            </td>
                            <td>
                                Birth of Venus
                            </td>
                            <td>
                                Boticelli
                            </td>
                            <td>
                                45
                            </td>
                            <td>
                                Renessaince, Classic, Replica
                            </td>
                            <td>
                                Painting, Oil Painting
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
                                            <FontAwesomeIcon icon={faX} />
                                        </p>
                                    </Row>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Col>
        
    )
}

export default WishList
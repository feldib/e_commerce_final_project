import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Button, Table } from 'react-bootstrap'


function ShoppingCartPage() {
    return (
        <Container>
            <Row>
                <Row className='mb-2 mt-5 mb-3'>
                    <h1 className='text-center'>Shopping Cart</h1>
                </Row>

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
                                    Painting, Oil painting
                                </td>
                                <td>
                                    <div className='container'>
                                        <p style={{cursor: "pointer"}}>
                                            <FontAwesomeIcon icon={faX} style={{color: "red"}} />
                                        </p>
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
                                    Painting, Oil painting
                                </td>
                                <td>
                                    <div className='container'>
                                        <p style={{cursor: "pointer"}}>
                                            <FontAwesomeIcon icon={faX} style={{color: "red"}} />
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Row>

            <Row className='mt-4'>
                <h2>
                    Order Summary: € 179
                </h2>
            </Row>

            <Row>
                <Col className='text-center mb-5'>
                    <Button>
                        Go to Checkout
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ShoppingCartPage;
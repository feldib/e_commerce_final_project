import React from 'react'
import { Col, Row, Container, Table, Button } from 'react-bootstrap'

function ReceiptPage() {
    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Receipt</h1>
            </Row>
            <Row>
                <Row>
                    <Table className='table-hover'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Quantity</th>
                                <th>Price (€)</th>
                                <th>Total Cost (€)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img 
                                            src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                            height="100"
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
                                    1
                                </td>
                                <td>
                                    45
                                </td>
                                <td>
                                    45
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img 
                                            src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                            height="100"
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
                                    2
                                </td>
                                <td>
                                    45
                                </td>
                                <td>
                                    90
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
                    Back to Shop
                </Button>
            </Col>
        </Row>
    </Container>
    )
}

export default ReceiptPage
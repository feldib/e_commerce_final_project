import React from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import OrderSummaryComponent from '../../components/OrderSummaryComponent'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'

function ReceiptPage(props) {
    const currentOrderData = JSON.parse(localStorage.getItem("currentOrder"))
    return (
    <Container className='pb-5'>
         <PageTitle 
            title="Receipt"
        />
        
        <OrderSummaryComponent 
            items={currentOrderData.items}
            totalCost={currentOrderData.totalCost}
            button={
                <Row>
                    <Col className='text-center mb-5'>
                        <Link to="/">
                            <Button onClick={
                                ()=>{
                                    localStorage.removeItem("currentOrder")
                                }
                            }>
                                Back to Shop
                            </Button>
                        </Link>
                    </Col>
                </Row>
            }
        />
    </Container>
    )
}

export default ReceiptPage
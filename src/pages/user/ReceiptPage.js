import React from 'react'
import { Col, Row, Container, Table, Button } from 'react-bootstrap'
import OrderSummaryComponent from '../../components/OrderSummaryComponent'
import { Link } from 'react-router-dom'

function ReceiptPage(props) {
    const currentOrderData = JSON.parse(localStorage.getItem("currentOrder"))
    return (
    <Container>
        <OrderSummaryComponent 
            items={currentOrderData.items}
            totalCost={currentOrderData.totalCost}
        />

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
    </Container>
    )
}

export default ReceiptPage
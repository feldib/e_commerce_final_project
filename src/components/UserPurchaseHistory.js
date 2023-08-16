import React from "react"
import OrderHistory from "../subpages/user/OrderHistory"
import { Button, Col, Row, Table} from 'react-bootstrap'

function UserPurchaseHistory() {
    return (
        <Row>
            <Row className='mb-3 mt-5'>
                <h3 className='text-center'>Purchase history of [User's name]</h3>
            </Row>

            <Row>
                <Col className="text-center">
                    <Button variant="secondary">Back to users</Button>
                </Col>
            </Row>

            <Row>
                <OrderHistory />
            </Row>
        </Row>
    )
}

export default UserPurchaseHistory;
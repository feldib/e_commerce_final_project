import React from 'react'
import { Col, Row, Table} from 'react-bootstrap'
import { useAxios, useLoading } from '../../fetching'
import OrderSummaryComponent from '../../components/OrderSummaryComponent'

function OrderHistory() {
    function representOrderDataCollection(orderDataCollection){
        const len = orderDataCollection.length
        return orderDataCollection.map((orderData, index)=>{
            return (
                <OrderSummaryComponent 
                    title={`Order ${len-index}`}
                    items={orderData.items}
                    totalCost={orderData.totalCost}
                />
            )
        })
    }

    const orderDataCollection = useAxios("/get_orders_of_user")
    const ordersRepresented = useLoading(orderDataCollection, representOrderDataCollection)
    return (
        <Col className='mb-5 pb-5'>
            {ordersRepresented}
        </Col>
    )
}

export default OrderHistory
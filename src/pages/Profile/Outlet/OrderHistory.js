import React from 'react'
import { Col } from 'react-bootstrap'
import useAxios from '../../../hooks/useAxios'
import useLoading from '../../../hooks/useLoading'
import OrderSummaryComponent from '../../../components/OrderSummaryComponent'
import { users_url } from '../../../utils/api_constants'

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

    const orderDataCollection = useAxios(`/${users_url}/get_orders_of_user`)
    const ordersRepresented = useLoading(orderDataCollection, representOrderDataCollection)
    return (
        <Col className='mb-5 pb-5'>
            {ordersRepresented}
        </Col>
    )
}

export default OrderHistory
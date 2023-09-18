import React from 'react'
import { Col } from 'react-bootstrap'
import useAxios from '../../../hooks/useAxios'
import useLoading from '../../../hooks/useLoading'
import { admin_url } from '../../../utils/api_constants'
import OrderSummaryComponent from '../../../components/OrderSummaryComponent'

function Orders(props) {

    function representOrderDataCollection(orderDataCollection){
        const len = orderDataCollection.length
        return orderDataCollection.map((orderData, index)=>{
            return (
                <OrderSummaryComponent 
                    title={`Order ${len-index}`}
                    items={orderData.items}
                    totalCost={orderData.totalCost}
                    user={orderData.user}
                />
            )
        })
    }

    const orders = useAxios(`/${admin_url}/get_orders`)
    const ordersRepresented = useLoading(orders, representOrderDataCollection)
    return (
        <Col className='mb-5 pb-5'>
            {ordersRepresented}
        </Col>
    )
}

export default Orders
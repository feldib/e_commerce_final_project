import React from 'react'
import { Col } from 'react-bootstrap'
import useLoading from '../../../hooks/useLoading'
import OrderSummaryComponent from '../../../components/OrderSummaryComponent'
import { getOrderHistory } from '../../../fetching'
import SubPageTitle from '../../../components/SubPageTitle'
import FloatingBackButton from '../../../components/buttons/FloatingBackButton'
import { useNavigate, useParams } from 'react-router-dom'

function UserOrderHistory() {
    const [orderDataCollection, setOrderDataCollection] = React.useState()

    React.useEffect(()=>{
        getOrderHistory(user_id).then((orders)=>{
            setOrderDataCollection(orders.data)
        })
    }, [])

    const navigate = useNavigate()
    const {user_id} = useParams()

    function representOrderDataCollection(orders){
        const len = orders.length
        return orders.map((orderData, index)=>{
            return (
                <OrderSummaryComponent 
                    title={`Order ${len-index}`}
                    items={orderData.items}
                    totalCost={orderData.totalCost}
                />
            )
        })
    }

    const ordersRepresented = useLoading(orderDataCollection, representOrderDataCollection)
    return (
        <Col className='mb-5 pb-5'>
            <SubPageTitle title="Order history" />
            {ordersRepresented}
            <FloatingBackButton 
                navigate={navigate}
            />
        </Col>
    )
}

export default UserOrderHistory
import React from 'react'
import { Col, Row, Container, Button, Table } from 'react-bootstrap'
import BuyTable from './BuyTable'
import { Link } from 'react-router-dom'

function OrderSummaryComponent(props) {
    return (
        <Container className='pb-3'>
            <Row>
                <Row className='mb-2 mt-5 mb-3'>
                    <h1 className='text-center'>{props.title}</h1>
                </Row>

                <BuyTable 
                    theadNeeded = {true}
                    dataLines = {props.items}
                    loggedIn={props.loggedIn} 
                    orderSummary={true}
                />
            </Row>

            <Row className='mt-4'>
                    {props.items &&
                        <h2>
                            Order Summary: € {
                                props.totalCost
                            }
                        </h2>
                    }
            </Row>
        </Container>
    )
}

export default OrderSummaryComponent
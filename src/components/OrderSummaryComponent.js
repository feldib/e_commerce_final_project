import React from 'react'
import { Col, Row, Container, Button, Table } from 'react-bootstrap'
import BuyTable from './tables/BuyTable'
import { Link } from 'react-router-dom'

function OrderSummaryComponent(props) {
    return (
        <Row className='mb-3 floating-element'>
            <Row>
                {props.title &&
                    <Row className='mb-2 mt-5 mb-3'>
                        <h2 className='text-start'>{props.title}</h2>
                    </Row>
                }

                {props.user &&
                    <Row className='mb-2 mt-5 mb-3'>
                        <h3 className='text-start'>User: {props.user.user_name}</h3>
                    </Row>
                }

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
            {props.button &&
                <>{props.button}</>
            }
        </Row>
    )
}

export default OrderSummaryComponent
import React from 'react'
import { Col, Row, Container, Button, Table } from 'react-bootstrap'
import BuyTable from './tables/BuyTable'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../App'

function OrderSummaryComponent(props) {
    const {user, loggedIn} = React.useContext(UserDataContext)

    return (
        <Row className='mb-3 floating-element'>
            <Row>
                {props.title &&
                    <Row className='mb-2 mb-3'>
                        <h2 className='text-center'>{props.title}</h2>
                    </Row>
                }

                {user &&
                    <Row className='mb-2 mt-5 mb-3'>
                        <h3 className='text-start'>User: {user.user_name}</h3>
                    </Row>
                }

                <BuyTable 
                    theadNeeded = {true}
                    dataLines = {props.items}
                    orderSummary={true}
                />
            </Row>

            <Row className='mt-4 text-start'>
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
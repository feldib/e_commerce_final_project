import React from 'react'
import { Col, Row, Container, Button, Table } from 'react-bootstrap'
import BuyTable from '../../components/BuyTable'
import { useAxios } from '../../fetching'

function WishList(props) {
    const wishListed = useAxios("/users/wishlisted")
    return (
        <Container className='mb-5 pb-5'>
            <Row>
                <Row className='mb-2 mt-5 mb-3'>
                    <h1 className='text-center'>Wishlisted</h1>
                </Row>

                <BuyTable 
                    theadNeeded = {true}
                    dataLines = {wishListed}
                    loggedIn={props.loggedIn} 
                />
            </Row>
        </Container>
    )
}

export default WishList;
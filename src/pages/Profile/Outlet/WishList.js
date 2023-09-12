import React from 'react'
import { Row, Container } from 'react-bootstrap'
import BuyTable from '../../../components/tables/BuyTable'
import useAxios from '../../../hooks/useAxios'
import SubPageTitle from '../../../components/SubPageTitle'

function WishList(props) {
    const wishListed = useAxios("/users/wishlisted")
    return (
        <Container className='mb-5 pb-5'>
            <Row>
                <SubPageTitle title="Wishlisted" />
                <Row className='floating-element'>
                    <BuyTable 
                        theadNeeded = {true}
                        dataLines = {wishListed}
                        loggedIn={props.loggedIn} 
                    />
                </Row>
            </Row>
        </Container>
    )
}

export default WishList;
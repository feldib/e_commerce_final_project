import React from 'react'
import { Col, Row, Container, Button, Table } from 'react-bootstrap'
import ShoppingCartTable from '../../components/tables/ShoppingCartTable'
import useAxios from '../../hooks/useAxios'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import SubPageTitle from '../../components/SubPageTitle'

function ShoppingCartPage(props) {
    const shoppingListItems = useAxios("/users/shopping_cart")
    const [totalCost, setTotalCost] = React.useState()
    React.useEffect(()=>{
        if(shoppingListItems){
            setTotalCost(
                shoppingListItems.filter((obj)=>{
                    return {
                        quantity: obj.quantity,
                        price: obj.price
                    }
                }).reduce((total, obj)=>{
                    return total + (obj.price * obj.quantity)
                }, 0)
            )
        }
        
    }, [shoppingListItems])
    return (
        <Container>
            <Row>
                <PageTitle 
                    title="Shopping Cart"
                />

                <ShoppingCartTable 
                    theadNeeded = {true}
                    dataLines = {shoppingListItems}
                    loggedIn={props.loggedIn} 
                />
            </Row>

            <Row className='mt-4'>
                    {shoppingListItems &&
                        <h2>
                            Order Summary: € {totalCost}
                        </h2>
                    }
            </Row>

            <Row>
                <Col className='text-center mb-5'>
                    <Link to="/checkout">
                        <Button onClick={()=>{
                            localStorage.removeItem("currentOrder")
                            localStorage.setItem("currentOrder", JSON.stringify({items: shoppingListItems, totalCost}))
                        }}>
                            Go to Checkout
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default ShoppingCartPage;
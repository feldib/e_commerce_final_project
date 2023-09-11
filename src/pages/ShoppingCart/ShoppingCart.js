import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Button, Table } from 'react-bootstrap'
import ShoppingCartTable from '../../components/ShoppingCartTable'
import useAxios from '../../hooks/useAxios'
import { Link } from 'react-router-dom'

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
                <Row className='mb-2 mt-5 mb-3'>
                    <h1 className='text-center'>Shopping Cart</h1>
                </Row>

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
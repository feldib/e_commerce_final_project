import React from 'react'
import { Col, Row, Container, Button, Table } from 'react-bootstrap'
import ShoppingCartTable from '../../components/tables/ShoppingCartTable'
import useShoppingList from '../../hooks/useShoppingList'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import SubPageTitle from '../../components/SubPageTitle'

function ShoppingCartPage(props) {
    const shoppingListItems = useShoppingList(props.loggedIn)

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
        <Container className='pb-5 mb-5'>
            <PageTitle 
                title="Shopping cart"
            />

            <Row className='floating-element'>
                <ShoppingCartTable 
                    theadNeeded = {true}
                    dataLines = {shoppingListItems}
                    loggedIn={props.loggedIn} 
                />
            

                <Row className='mt-4'>
                        {shoppingListItems &&
                            <h2>
                                Order Summary: € {totalCost}
                            </h2>
                        }
                </Row>

                <Row>
                    <Col className='text-center mb-5'>
                        <Link 
                            to={props.loggedIn ? "/checkout" : "/login"}
                            state = {{
                                to_checkout: props.loggedIn ? false : true
                            }}
                        >
                            <Button onClick={()=>{
                                localStorage.removeItem("currentOrder")
                                localStorage.setItem("currentOrder", JSON.stringify({items: shoppingListItems, totalCost}))
                            }}>
                                Go to Checkout
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default ShoppingCartPage;
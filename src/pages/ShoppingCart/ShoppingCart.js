import React from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap'
import ShoppingCartTable from '../../components/tables/ShoppingCartTable'
import useShoppingList from '../../hooks/useShoppingList'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import { UserDataContext } from '../../App'

function ShoppingCartPage(props) {
    const {user, loggedIn} = React.useContext(UserDataContext)

    const shoppingListItems = useShoppingList(loggedIn)

    const [costs, setCosts] = React.useState({})

    const [totalCost, setTotalCost] = React.useState(0)

    return (
        <Container className='pb-5 mb-5'>
            <PageTitle 
                title="Shopping cart"
            />

            <Row className='px-3 mx-auto floating-element mb-5'>
                <ShoppingCartTable 
                    theadNeeded = {true}
                    dataLines = {shoppingListItems}
                    changeCosts={
                        (key, newCost) => {
                            const temp = costs

                            temp[key] = newCost

                            setCosts(temp)

                            setTotalCost(
                                Object.values(costs).reduce(
                                    (acc, curr) => acc + curr,
                                    0
                                )
                            )
                        }
                    }
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
                            to={loggedIn ? "/checkout" : "/login"}
                            state = {{
                                to_checkout: loggedIn ? false : true
                            }}
                        >
                            <Button 
                                className='submit'
                                onClick={()=>{
                                    localStorage.removeItem("currentOrder")
                                    localStorage.setItem("currentOrder", JSON.stringify({items: shoppingListItems, totalCost}))
                                }}
                            >
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
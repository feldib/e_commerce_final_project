import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Button, Form, InputGroup, Dropdown} from 'react-bootstrap'
import UsersSearchResults from '../../../components/UsersSearchResults'
import UserPurchaseHistory from '../../../components/UserPurchaseHistory'
import SearchField from '../../../components/SearchField'

function Users() {
    return (
            <Col>
                <SearchField 
                    placeholder="Enter user's name"
                />


                <Row className='mx-auto mb-3 text-end'>
                    <Col>
                        <Button>
                            Search
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <p>
                            <FontAwesomeIcon icon={faFilter} style={{
                                color: "red",
                                border: "2px solid red",
                                borderRadius: "10px",
                                padding: "2px"
                            }} />
                            <span style={{
                                margin: "10px",
                                fontSize: "1.5rem"
                            }}>Michelangelo</span>
                            <span
                                className='mx-1'
                                style={{ cursor: "pointer" }}
                                onClick={() => {}}
                            >❌</span>
                        </p>
                    </Col>

                    <Col>
                        <Row>
                            <Col lg={4} className='mx-auto mt-3'>
                                <Dropdown
                                onSelect={(eventKey)=>{return}}
                                >
                                    <Dropdown.Toggle>Number of users shown</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            href=""
                                            eventKey="10"
                                        >
                                            10
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            href=""
                                            eventKey="20"
                                        >
                                            20
                                        </Dropdown.Item>
                                        
                                        <Dropdown.Item
                                            href=""
                                            eventKey="30"
                                        >
                                            30
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col lg={4} className='mx-auto mt-3'>
                                <Dropdown
                                onSelect={(eventKey)=>{return}}
                                >
                                    <Dropdown.Toggle>Order by</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            href=""
                                            eventKey="Newest to oldest"
                                        >
                                            A - Z
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            href=""
                                            eventKey="Oldest to newest"
                                        >
                                            Z - A
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>

                

                <Row>
                    <UsersSearchResults />
                    <UserPurchaseHistory />
                </Row>

            </Col>
    )
}

export default Users
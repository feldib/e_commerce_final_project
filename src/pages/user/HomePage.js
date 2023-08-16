import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBasketShopping, faMagnifyingGlass, faCaretDown, faCaretUp, faFilter } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Button, Form, InputGroup, Dropdown, Table } from 'react-bootstrap'

function HomePage() {
    return (
        <div>
            <Container>
                <Row lg={6} sx={8} className='mx-auto mb-3 mt-5'>
                    <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter the title of an artwork or the name of an artist"
                            />
                            <Button >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Button>
                        </InputGroup>
                </Row>

                <Row className='mx-auto mb-3'>
                    <Dropdown>
                        <Dropdown.Toggle>Categories</Dropdown.Toggle>
                        <Dropdown.Menu className='px-3'>
                            <Form.Check
                                type="switch"
                                id="cat1"
                                onChange={()=>{}}
                                label="Category 1"
                            />

                            <Form.Check
                                type="switch"
                                id="cat1"
                                onChange={()=>{}}
                                label="Category 1"
                            />
                            
                            <Form.Check
                                type="switch"
                                id="cat1"
                                onChange={()=>{}}
                                label="Category 1"
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>

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
                            }}>25 - 300 EUR</span>
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
                                    <Dropdown.Toggle>Number of artworks shown</Dropdown.Toggle>
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
                                            Newest to oldest
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            href=""
                                            eventKey="Oldest to newest"
                                        >
                                            Oldest to newest
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>

                <Row>
                    <Row className='mb-3 mt-5'>
                        <h3 className='text-center'>Search results</h3>
                    </Row>

                    <Row>
                        <Table className='table-hover'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Artist</th>
                                    <th>Price (€)</th>
                                    <th>Tags</th>
                                    <th>Categories</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                    </td>
                                    <td>
                                        Birth of Venus
                                    </td>
                                    <td>
                                        Boticelli
                                    </td>
                                    <td>
                                        45
                                    </td>
                                    <td>
                                        Renessaince, Classic, Replica
                                    </td>
                                    <td>
                                        Painting, Oil Painting
                                    </td>
                                    <td>
                                        <div className='container'>
                                            <Row>
                                                <p style={{cursor: "pointer"}}>
                                                    <FontAwesomeIcon icon={faBasketShopping} />
                                                </p>
                                            </Row>
                                            <Row>
                                                <p style={{cursor: "pointer"}}>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </p>
                                            </Row>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                    </td>
                                    <td>
                                        Birth of Venus
                                    </td>
                                    <td>
                                        Boticelli
                                    </td>
                                    <td>
                                        45
                                    </td>
                                    <td>
                                        Renessaince, Classic, Replica
                                    </td>
                                    <td>
                                        Painting, Oil Painting
                                    </td>
                                    <td>
                                        <div className='container'>
                                            <Row>
                                                <p style={{cursor: "pointer"}}>
                                                    <FontAwesomeIcon icon={faBasketShopping} />
                                                </p>
                                            </Row>
                                            <Row>
                                                <p style={{cursor: "pointer"}}>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </p>
                                            </Row>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Row>

                <Row className="d-flex flex-wrap mb-3 mx-auto">
                    <Row col={12} className="my-4">
                        <Col sx={12} md={5} lg={3} className="mb-2 mx-3 d-flex align-content-between flex-wrap">
                            <Row>
                                <Col>
                                    <h4 className='text-center'>Featured</h4>
                                </Col>
                                <Col>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </Col>                                
                            </Row>
                            <Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                        <Col sx={12} md={5} lg={3} className="mb-2 mx-3 d-flex align-content-between flex-wrap">
                            <Row>
                                <Col>
                                    <h4 className='text-center'>Wishlisted the most</h4>
                                </Col>
                                <Col>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </Col>    
                            </Row>
                            <Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                        <Col sx={12} md={5} lg={3} className="mb-2 mx-3 d-flex align-content-between flex-wrap">
                            <Row>
                                <Col>
                                    <h4 className='text-center'>Newest</h4>
                                </Col>
                                <Col>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </Col>                                </Row>
                            <Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                        <Col sx={12} md={5} lg={3} className="mb-2 mx-3 d-flex align-content-between flex-wrap">
                            <Row>
                                <Col>
                                    <h4 className='text-center'>Already purchased with tag or category</h4>
                                </Col>
                                <Col>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </Col>    
                            </Row>
                            <Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                        <Col sx={12} md={5} lg={3} className="mb-2 mx-3 d-flex align-content-between flex-wrap">
                            <Row>
                                <Row>
                                    <Col>
                                        <h4 className='text-center'>Wishlisted by you</h4>
                                    </Col>
                                    <Col>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </Col>    
                                </Row>
                            </Row>
                            <Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                        <Col sx={12} md={5} lg={3} className="mb-2 mx-3 d-flex align-content-between flex-wrap">
                            <Row>
                                <Row>
                                    <Col>
                                        <h4 className='text-center'>Recently viewed</h4>
                                    </Col>
                                    <Col>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </Col>    
                                </Row>                            
                            </Row>
                            <Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='border'>
                                    <Col>
                                        <Row>
                                            <img 
                                                src="https://d7hftxdivxxvm.cloudfront.net/?height=600&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fpj1Kk4Od1CBV8tWBLk3zeA%2Fnormalized.jpg&width=800" 
                                                height="100"
                                                weight="100"
                                                style={{objectFit: "contain"}}
                                            />
                                        </Row>
                                        <Row className='text-center'>
                                            Birth of Venus
                                        </Row>
                                    </Col>
                                    <Col>
                                        <p>
                                            €45
                                        </p>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </Row>

            </Container>
            

            {/*<FontAwesomeIcon icon={faCoffee} /> */}
        </div>
    )
}

export default HomePage
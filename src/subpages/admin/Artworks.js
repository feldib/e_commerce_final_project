import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faX, faGear, faMagnifyingGlass, faCaretDown, faCaretUp, faFilter, faAsterisk, faPlusCircle, faDollar, faQuestion, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Button, Form, InputGroup, Dropdown, Table, Collapse, Card } from 'react-bootstrap'

function Artworks() {
    const [openAdding, setOpenAdding] = React.useState(false)
    const [openEditing, setOpenEditing] = React.useState(false)

    return (
        <Col>
            <Row>
                <Row>
                    <Col>
                        <Button 
                            variant='secondary'
                            onClick={()=>{setOpenAdding(!openAdding)}}
                            aria-expanded = {openAdding}
                            aria-controls='addingNewArtwork'
                        >
                            Add new artwork
                        </Button>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col>
                        <Collapse in={openAdding} >
                            <Card body id='addingNewArtwork' style={{ width: '400px' }}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Title</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                            </InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter artwork title" />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Artist</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                            </InputGroup.Text>
                                            <Form.Control type="text" placeholder="Enter name of Artist" />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Price</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faDollar} className='mx-3'/>
                                            </InputGroup.Text>
                                            <Form.Control type="number" placeholder="Enter price in EUR" />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Tags</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                                            </InputGroup.Text>
                                            <Form.Control type="text" placeholder="Choose tags" />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Quantity</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                                            </InputGroup.Text>
                                            <Form.Control type="number" placeholder="Enter quantity" />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Categories</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                                            </InputGroup.Text>
                                            <Form.Control type="text" placeholder="Choose categories" />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Thumbnail URL</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                            </InputGroup.Text>
                                            <Form.Control type="text" placeholder="Choose tags" />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Picture no. 2</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="text" placeholder="Choose tags" />

                                            <InputGroup.Text>
                                                <FontAwesomeIcon 
                                                    icon={faX} 
                                                    className='mx-3'
                                                    style={{cursor: "pointer", color: "red"}}
                                                />
                                            </InputGroup.Text>
                                        </InputGroup>
                                            
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Col>
                                            <p>
                                                <FontAwesomeIcon 
                                                    icon={faPlusCircle} 
                                                    className='mx-3'
                                                    style={{cursor: "pointer", display: "inline"}}
                                                />
                                                Add more pictures
                                            </p>
                                        </Col>

                                        <Col>
                                            <Button variant="primary" type="submit">
                                                Add artwork
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card>
                        </Collapse>
                    </Col>
                </Row>

            </Row>

            <Row>
                <Row lg={6} sx={8} className='mx-auto mb-3 mt-5'>
                    <InputGroup>
                            <InputGroup.Text>
                                Price range (min, max)
                            </InputGroup.Text>

                            <Form.Control
                                type="number"
                                placeholder="Minimum"
                            />

                            <Form.Control
                                type="number"
                                placeholder="Maximum"
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
            </Row>

            <Row>
                <Row className='mt-3'>
                    <Col>
                        <Collapse in={openEditing} >
                            <Card body id='editingArtworkData' style={{ width: '400px' }}>
                                <Card.Title>
                                    Edit artwork data
                                </Card.Title>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Title</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="text" placeholder="Enter artwork title" disabled/>

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Artist</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="text" placeholder="Enter name of Artist" disabled/>

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Price</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faDollar} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="number" placeholder="Enter price in EUR" disabled />

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Tags</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="text" placeholder="Choose tags" disabled />

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Quantity</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="number" placeholder="Enter quantity" disabled/>

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Categories</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="text" placeholder="Choose categories" disabled />

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Thumbnail URL</Form.Label>
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="text" placeholder="Choose tags" disabled />

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faGear} className='mx-3'/>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Picture no. 2</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faKeyboard} className='mx-3'/>
                                            </InputGroup.Text>

                                            <Form.Control type="text" placeholder="Choose tags" />

                                            <InputGroup.Text>
                                                <FontAwesomeIcon 
                                                    icon={faX} 
                                                    className='mx-3'
                                                    style={{cursor: "pointer", color: "red"}}
                                                />
                                            </InputGroup.Text>
                                        </InputGroup>
                                            
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Col>
                                            <p>
                                                <FontAwesomeIcon 
                                                    icon={faPlusCircle} 
                                                    className='mx-3'
                                                    style={{cursor: "pointer", display: "inline"}}
                                                />
                                                Add more pictures
                                            </p>
                                        </Col>

                                        <Col>
                                            <Button 
                                                variant="danger"
                                                onClick={()=>{setOpenEditing(!openEditing)}}
                                                aria-expanded = {openEditing}
                                                aria-controls='editingArtworkData'
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card>
                        </Collapse>
                    </Col>
                </Row>

            </Row>

            <Row>
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
                                            <p 
                                                style={{cursor: "pointer"}}
                                                onClick={()=>{setOpenEditing(!openEditing)}}
                                                aria-expanded = {openEditing}
                                                aria-controls='editingArtworkData'
                                            >
                                                <FontAwesomeIcon icon={faGear} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faX} />
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
                                            <p 
                                                style={{cursor: "pointer"}}
                                                onClick={()=>{setOpenEditing(!openEditing)}}
                                                aria-expanded = {openEditing}
                                                aria-controls='editingArtworkData'
                                            >
                                                <FontAwesomeIcon icon={faGear} />
                                            </p>
                                        </Row>
                                        <Row>
                                            <p style={{cursor: "pointer"}}>
                                                <FontAwesomeIcon icon={faX} />
                                            </p>
                                        </Row>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Row>
        </Col>
    )
}

export default Artworks
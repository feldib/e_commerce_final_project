import React from 'react'
import server_url from '../../server'
import axios from 'axios'

import { Col, Row, Container, Button, Dropdown, InputGroup, Form } from 'react-bootstrap'
import SearchField from '../../components/SearchField'
import Query from '../../components/Query'
import CategoriesDropdown from '../../components/CategoriesDropdown'
import BuyTable from '../../components/BuyTable'

function Search() {
    const [categories, setCategories] = React.useState([])

    const [queries, setQueries] = React.useState(
        {min: "", max: "", title: "", artist_name: "", category_id: "", order: "asc", n: 10}
    )
    
    const [searchResults, setSearchResults] = React.useState([])
    
    React.useEffect(()=>{
        (async()=>{
            await axios.get(`${server_url}/categories`)
            .then(function (cats) {
                setCategories(cats.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        })()
    }, [])

    async function search(){
        const qs = []
        for (const [key, value] of Object.entries(queries)) {
            if(value){
                qs.push(
                    `${key}=${value}`
                )
            }
        }
        await axios.get(`${server_url}/search_artworks${`?${qs.join("&")}`}`)
        .then(function (artw) {
            setSearchResults(artw.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div>
            <Container>
                <SearchField
                    what="Title"
                    saveQuery={(title)=>{
                        setQueries({
                            ...queries,
                            title
                        })
                    }}
                />

                <SearchField
                    what="Artist"
                    saveQuery={(name)=>{
                        setQueries({
                            ...queries,
                            artist_name: name
                        })
                    }}
                />

                <Row lg={6} sx={8} className='mx-auto mb-5 mt-5'>
                    <InputGroup>
                            <InputGroup.Text>
                                Price range (min, max)
                            </InputGroup.Text>

                            <Form.Control
                                type="number"
                                placeholder="Minimum"
                                onBlur={(e)=>{
                                    setQueries({
                                        ...queries,
                                        min: e.target.value
                                    })
                                }}
                            />

                            <Form.Control
                                type="number"
                                placeholder="Maximum"
                                onBlur={(e)=>{
                                    setQueries({
                                        ...queries,
                                        max: e.target.value
                                    })
                                }}
                            />
                        </InputGroup>
                </Row>
                
                <Row>
                    <CategoriesDropdown 
                        categories = {categories}
                        switchCategoryTo = {(newCategory)=>{
                            setQueries({
                                ...queries,
                                category_id: newCategory.id
                            })
                        }}
                    />

                    <Col>
                        <Dropdown
                            onSelect={(eventKey)=>{
                                setQueries({
                                    ...queries,
                                    n: eventKey
                                })
                            }}
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
                    
                    <Col>
                        <Dropdown
                            onSelect={(eventKey)=>{
                                setQueries({
                                    ...queries,
                                    order: eventKey
                                })
                            }}
                        >
                            <Dropdown.Toggle>Order by</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    href=""
                                    eventKey="asc"
                                >
                                    Newest to oldest
                                </Dropdown.Item>

                                <Dropdown.Item
                                    href=""
                                    eventKey="desc"
                                >
                                    Oldest to newest
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                </Row>

                <Row className='mx-auto mb-3 text-end'>
                    <Col>
                        <Button
                            onClick = {search}
                        >

                            Search
                        </Button>
                    </Col>
                </Row>

                <Row>
                    {(queries.min && queries.max) ?
                            <Query 
                                text = {`Between ${queries.min} and ${queries.max}`}
                                remove = {()=>{
                                    setQueries(
                                        {
                                            ...queries,
                                            min: "",
                                            max: ""
                                        }
                                    )
                                }}
                            />
                        :
                            queries.min ?
                            <Query 
                                text = {`Minimum: ${queries.min}`}
                                remove = {()=>{
                                    setQueries(
                                        {
                                            ...queries,
                                            min: "",
                                        }
                                    )
                                }}
                            />:

                            queries.max &&
                            <Query 
                                text = {`Maxim: ${queries.max}`}
                                remove = {()=>{
                                    setQueries(
                                        {
                                            ...queries,
                                            max: "",
                                        }
                                    )
                                }}
                            />
                    }

                    {queries.title &&
                        <Query 
                        text = {`Title: ${queries.title}`}
                        remove = {()=>{
                            setQueries(
                                {
                                    ...queries,
                                    title: ""
                                }
                            )
                        }}
                    />
                    }

                    {queries.artist_name &&
                        <Query 
                            text = {`Artist: ${queries.artist_name}`}
                            remove = {()=>{
                                setQueries(
                                    {
                                        ...queries,
                                        artist_name: ""
                                    }
                                )
                            }}
                        />
                    }

                    {queries.category_id &&
                        <Query 
                            text = {`${
                                categories.find((cat)=>{
                                    return cat.id === queries.category_id
                                }).cname
                            }`}
                            remove = {()=>{
                                setQueries(
                                    {
                                        ...queries,
                                        category_id: ""
                                    }
                                )
                            }}
                        />
                    }

                </Row>

                {searchResults.length !==0 &&
                    <Row>
                        <Row className='mb-3 mt-5'>
                            <h3 className='text-center'>Search results</h3>
                        </Row>
                        
                        <BuyTable 
                            reccomendation = {false}
                            theadNeeded = {true}
                            dataLines = {searchResults}
                        />
                    </Row>
                }

            </Container>            
        </div>
    )
}

export default Search
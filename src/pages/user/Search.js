import React from 'react'
import server_url from '../../server'
import axios from 'axios'
import { useAxios, getArtworkSearchResults } from '../../fetching'

import { Col, Row, Container, Button, Dropdown, InputGroup, Form } from 'react-bootstrap'
import SearchField from '../../components/SearchField'
import Query from '../../components/Query'
import CategoriesDropdown from '../../components/CategoriesDropdown'
import BuyTable from '../../components/BuyTable'

function Search() {
    const [queries, setQueries] = React.useState(
        {min: "", max: "", title: "", artist_name: "", category_id: "", order: "asc", n: 10}
    )
    const categories = useAxios("/categories")

    const [searchResults, setSearchResults] = React.useState()
    async function search(){
        const qs = []
        for (const [key, value] of Object.entries(queries)) {
            if(value){
                qs.push(
                    `${key}=${value}`
                )
            }
        }
        await getArtworkSearchResults(qs, setSearchResults)
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
                            <Dropdown.Toggle variant='outilne-dark'>Number of artworks shown</Dropdown.Toggle>
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
                            <Dropdown.Toggle variant='outilne-dark'>Order by</Dropdown.Toggle>
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
                            className='submit'
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
                                    search()
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
                                    search()
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
                                    search()
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
                            search()
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
                                search()
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
                                search()
                            }}
                        />
                    }

                </Row>

                {searchResults &&
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
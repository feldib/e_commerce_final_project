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
    const minInputField = React.useRef()
    const maxInputField = React.useRef()
    const titleInputField = React.useRef()
    const artistInputField = React.useRef()
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

    function makeRemoveFunction(newQueriesObj, ...inputFieldsToReset){
        return ()=>{
            inputFieldsToReset.forEach((ref) => {
                ref.current.value=""
            })
            setQueries(newQueriesObj)
            setIsConditionBeignRemoved(true)
        }
    }

    const [isConditionBeignRemoved, setIsConditionBeignRemoved] = React.useState(false)
    React.useEffect(()=>{
        if(isConditionBeignRemoved){
            search()
            setIsConditionBeignRemoved(false)
        }
    }, [isConditionBeignRemoved])

    return (
        <Container className='pb-5 mb-5'>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Search</h1>
            </Row>
            <SearchField
                what="Title"
                inputRef={titleInputField}
                saveQuery={(title)=>{
                    setQueries({
                        ...queries,
                        title
                    })
                }}
            />

            <SearchField
                what="Artist"
                inputRef={artistInputField}
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
                            ref={minInputField}
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
                            ref={maxInputField}
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
                            remove = {
                                makeRemoveFunction(
                                    {
                                        ...queries,
                                        min: "",
                                        max: ""
                                    },
                                    minInputField,
                                    maxInputField
                                )
                            }
                        />
                    :
                        queries.min ?
                        <Query 
                            text = {`Minimum: ${queries.min}`}
                            remove = {
                                makeRemoveFunction(
                                    {
                                        ...queries,
                                        min: "",
                                    },
                                    minInputField
                                )
                            }
                        />:

                        queries.max &&
                        <Query 
                            text = {`Maximum: ${queries.max}`}
                            remove = {
                                makeRemoveFunction(
                                    {
                                        ...queries,
                                        max: "",
                                    },
                                    maxInputField
                                )
                            }
                        />
                }

                {queries.title &&
                    <Query 
                    text = {`Title: ${queries.title}`}
                    remove = {
                        makeRemoveFunction(
                            {
                                ...queries,
                                title: "",
                            },
                            titleInputField
                        )
                    }
                />
                }

                {queries.artist_name &&
                    <Query 
                        text = {`Artist: ${queries.artist_name}`}
                        remove = {
                            makeRemoveFunction(
                                {
                                    ...queries,
                                    artist_name: "",
                                },
                                artistInputField
                            )
                        }
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
                            setIsConditionBeignRemoved(true)
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
    )
}

export default Search
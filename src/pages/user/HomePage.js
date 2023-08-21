import React from 'react'
import server_url from '../../server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Button, Dropdown, InputGroup, Form } from 'react-bootstrap'
import SearchField from '../../components/SearchField'
import Query from '../../components/Query'
import CategoriesDropdown from '../../components/CategoriesDropdown'
import BuyTable from '../../components/BuyTable'

function HomePage() {
    const [categories, setCategories] = React.useState([])

    const [queries, setQueries] = React.useState(
        {min: "", max: "", title: "", artist_name: "", category_id: "", order: "asc", n: 10}
    )
    
    const [featured, setFeatured] = React.useState([])
    const [searchResults, setSearchResults] = React.useState([])
    
    React.useEffect(()=>{
        (async()=>{
            await fetch(`${server_url}/categories`)
            .then((response)=>response.json())
            .then((cats)=>{
                setCategories(cats)
            })
            .catch((err)=>{console.log(err)})
        })()
    }, [])

    React.useEffect(()=>{
        (async()=>{
            await fetch(`${server_url}/users/recommendation/featured`)
            .then((response)=>response.json())
            .then((feat)=>{
                setFeatured(feat)
            })
            .catch((err)=>{console.log(err)})
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
        await fetch(`
            ${server_url}/search_artworks${`?${qs.join("&")}`}`)
        .then((response)=>response.json())
        .then((artw)=>{
            setSearchResults(artw)
        })
        .catch((err)=>{console.log(err)})
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
                    {/*
                            //{min, max, title, artist_name, category_id, order, n}ű
                    <Query 
                        text = {query}
                        remove = {()=>{
                                setQueries(
                                queries.filter((q)=>{
                                    return q !== query
                                })
                            )
                        }}
                    /> */}

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
                            categories = {categories}
                        />
                    </Row>
                }

                <Row className="mb-3 d-flex justify-content-evenly">
                        <Col sx={12} md={5} lg={3} className="mb-2 mx-3">

                            <Row>
                                <Col>
                                    <h4 className='text-center'>Featured</h4>
                                </Col>
                                <Col>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </Col>                                
                            </Row>

                            <BuyTable 
                                reccomendation = {true}
                                theadNeeded = {false}
                                dataLines = {featured}
                                categories = {categories}
                            />
                        </Col>
                    


                </Row>

            </Container>
            

            {/*<FontAwesomeIcon icon={faCoffee} /> */}
        </div>
    )
}

export default HomePage
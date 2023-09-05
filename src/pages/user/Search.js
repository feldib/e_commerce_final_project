import React from 'react'
import { useAxios, getArtworkSearchResults } from '../../fetching'
import { Col, Row, Container, Button, Dropdown, InputGroup, Form } from 'react-bootstrap'
import SearchField from '../../components/SearchField'
import Query from '../../components/Query'
import CategoriesDropdown from '../../components/CategoriesDropdown'
import BuyTable from '../../components/BuyTable'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Search() {

    async function search(values){
        const qs = []
        for (const [key, value] of Object.entries(values)) {
            if(value){
                qs.push(
                    `${key}=${value}`
                )
            }
        }
        await getArtworkSearchResults(qs, setSearchResults)
    }


    const formik = useFormik({
        initialValues: {
            min: "", 
            max: "", 
            title: "", 
            artist_name: "", 
            category_id: "", 
            order: "asc", 
            n: 10
        },

        onSubmit: (values) => search(values),
        
        validationSchema: Yup.object({
            min: Yup.string()
                .max(Yup.ref("max")-1, 'Minimum number cannot be larger than maximum'),
            max: Yup.string()
                .min(Yup.ref("min")+1, 'Maximum number cannot be smaller than minimum')
        })

    })

    const categories = useAxios("/categories")

    const [searchResults, setSearchResults] = React.useState()

    return (
        <Container className='pb-5 mb-5'>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Search</h1>
            </Row>

            <Form onSubmit={formik.handleSubmit}>
                <SearchField
                    what="Title"
                    name="title"
                    category_id="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />

                <SearchField
                    what="Artist"
                    name="artist_name"
                    category_id="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    value={formik.values.artist_name}
                />

                <Row lg={6} sx={8} className='mx-auto mb-5 mt-5'>
                    <InputGroup>
                            <InputGroup.Text>
                                Price range (min, max)
                            </InputGroup.Text>

                            <Form.Control
                                type="number"
                                placeholder="Minimum"
                                name="min"
                                value={formik.values.min}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            <Form.Control
                                type="number"
                                placeholder="Maximum"
                                name="max"
                                value={formik.values.max}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </InputGroup>
                </Row>
                
                <Row>
                    <CategoriesDropdown 
                        categories = {categories}
                        category_id="category_id"
                        setValue={formik.setFieldValue}
                    />

                    <Col>
                        <Dropdown
                            value={formik.values.n}
                            onSelect={(e)=>{
                                formik.setFieldValue("n", e)
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
                            value={formik.values.order}
                            onSelect={(e)=>{
                                formik.setFieldValue("order", e)
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
                            type="submit"
                        >
                            Search
                        </Button>
                    </Col>
                </Row>

                <Row>
                {(
                    formik.values.min && formik.values.max && 
                    formik.errors.min && formik.errors.max
                ) ?
                        <Query 
                            text = {`Between ${formik.values.min} and ${formik.values.max}`}
                            remove = {
                                ()=>{
                                    formik.setFieldValue('max', '')
                                    formik.setFieldValue('min', '')
                                    formik.submitForm()
                                }
                            }
                        />
                    :
                        formik.values.min ?
                        <Query 
                            text = {`Minimum: ${formik.values.min}`}
                            remove = {
                                ()=>{
                                    formik.setFieldValue('min', '')
                                    formik.submitForm()
                                }
                            }
                        />:

                        formik.values.max &&
                        <Query 
                            text = {`Maximum: ${formik.values.max}`}
                            remove = {
                                ()=>{
                                    formik.setFieldValue('max', '')
                                    formik.submitForm()
                                }
                            }
                        />
                }

                {formik.values.title &&
                    <Query 
                    text = {`Title: ${formik.values.title}`}
                    remove = {
                        ()=>{
                            formik.setFieldValue('title', '')
                            formik.submitForm()
                        }
                    }
                />
                }

                {formik.values.artist_name &&
                    <Query 
                        text = {`Artist: ${formik.values.artist_name}`}
                        remove = {
                            ()=>{
                                formik.setFieldValue('artist_name', '')
                                formik.submitForm()
                            }
                        }
                    />
                }

                {formik.values.category_id &&
                    <Query 
                        text = {`${
                            categories.find((cat)=>{
                                return cat.id === parseInt(formik.values.category_id)
                            }).cname
                        }`}
                        remove = {()=>{
                            formik.setFieldValue('category_id', '')
                            formik.submitForm()
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
            </Form>

            

        </Container>            
    )
}

export default Search
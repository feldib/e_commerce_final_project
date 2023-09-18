import React from 'react'
import { Col, Row, Button, Dropdown, InputGroup, Form } from 'react-bootstrap'
import SearchField from '../../components/input/SearchField'
import CategoriesDropdown from '../../components/input/CategoriesDropdown'
import Queries from '../Queries'

function ArtworkSearchFields(props) {

    return (
        <div className='floating-element mb-3'>
            <SearchField
                what="Title"
                name="title"
                category_id="title"
                onChange={props.formik.handleChange}
                onBlur={props.formik.handleBlur}
                value={props.formik.values.title}
            />

            <SearchField
                what="Artist"
                name="artist_name"
                category_id="title"
                onChange={props.formik.handleChange}
                onBlur={props.formik.handleBlur} 
                value={props.formik.values.artist_name}
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
                            value={props.formik.values.min}
                            onChange={props.formik.handleChange}
                            onBlur={
                                (e)=>{
                                    props.formik.handleBlur(e)
                                    if(props.formik.values.min < 0){
                                        props.formik.setFieldValue("min", "")
                                    }
                                    const max = props.formik.values.max
                                    if(!((max && max > props.formik.values.min) || !max)){
                                        props.formik.setFieldValue("max", "")
                                    }
                                }
                            }
                        />

                        <Form.Control
                            type="number"
                            placeholder="Maximum"
                            name="max"
                            value={props.formik.values.max}
                            onChange={props.formik.handleChange}
                            onBlur={
                                (e)=>{
                                    props.formik.handleBlur(e)
                                    const min = props.formik.values.min
                                    if(!(min && min < props.formik.values.max) || !min){
                                        props.formik.setFieldValue("max", "")
                                    }
                                }
                            }
                        />
                    </InputGroup>
            </Row>
            
            <Row>
                <CategoriesDropdown 
                    categories = {props.categories}
                    setValue={
                        (value) => {
                            props.formik.setFieldValue("category_id", value)
                        }
                    }
                />

                <Col className='mb-3'>
                    <Dropdown
                        value={props.formik.values.n}
                        onSelect={(e)=>{
                            props.formik.setFieldValue("n", e)
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
                
                <Col className='mb-4'>
                    <Dropdown 
                        value={props.formik.values.order}
                        onSelect={(e)=>{
                            props.formik.setFieldValue("order", e)
                        }}
                    >
                        <Dropdown.Toggle variant='outilne-dark'>Order by</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                href=""
                                eventKey="desc"
                            >
                                Newest to oldest
                            </Dropdown.Item>

                            <Dropdown.Item
                                href=""
                                eventKey="asc"
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

            <Queries formik={props.formik} categories={props.categories} />
        </div>
    )
}

export default ArtworkSearchFields
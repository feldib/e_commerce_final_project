import React from 'react'
import { Col, Dropdown } from 'react-bootstrap'
import useLoading from '../../hooks/useLoading'

function CategoriesDropdown(props) {
    function createCategoryButtons(categories){
        return (
            categories.map(
                (category, index)=>{
                    return (
                        <Dropdown.Item
                            eventKey={category.id}
                            key={index}
                            id={category.id}
                            style={{cursor: "pointer"}}
                        >
                            {category.cname}
                        </Dropdown.Item>
                    )
                }
            )
        )
    }
    const categories = useLoading(props.categories, createCategoryButtons)
    return (
        <Col className='mx-auto mb-3'>
            <Dropdown 
                onSelect={(e)=>{
                    props.setValue(e)
                }}
            >
                <Dropdown.Toggle variant='outilne-dark'>Categories</Dropdown.Toggle>
                <Dropdown.Menu className='px-3'>
                        <Dropdown.Item
                            eventKey={""}
                            key={"all"}
                            id={"all"}
                            style={{cursor: "pointer"}}
                        >
                            All
                        </Dropdown.Item>
                    {categories}
                </Dropdown.Menu>
            </Dropdown>
        </Col>       
        
    )
}

export default CategoriesDropdown
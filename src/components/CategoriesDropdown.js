import React from 'react'
import { Col, Dropdown } from 'react-bootstrap'
import { useLoading } from '../fetching'

function CategoriesDropdown(props) {
    function createCategoryButtons(categories){
        return (
            categories.map(
                (category, index)=>{
                    return (
                        <p
                            key={index}
                            id={category.id}
                            onClick={()=>{
                                props.switchCategoryTo(category)
                            }}
                            style={{cursor: "pointer"}}
                        >
                            {category.cname}
                        </p>
                    )
                }
            )
        )
    }
    const categories = useLoading(props.categories, createCategoryButtons)
    return (
        <Col className='mx-auto mb-3'>
            <Dropdown>
                <Dropdown.Toggle variant='outilne-dark'>Categories</Dropdown.Toggle>
                <Dropdown.Menu className='px-3'>
                    {categories}
                </Dropdown.Menu>
            </Dropdown>
        </Col>       
        
    )
}

export default CategoriesDropdown
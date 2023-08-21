import React from 'react'
import { Col, Form, Dropdown } from 'react-bootstrap'

function CategoriesDropdown(props) {
    return (
        <Col className='mx-auto mb-3'>
            <Dropdown>
                <Dropdown.Toggle>Categories</Dropdown.Toggle>
                <Dropdown.Menu className='px-3'>
                    {props.categories.map(
                        (category)=>{
                            return (
                                <p
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
                    )}
                    
                </Dropdown.Menu>
            </Dropdown>
        </Col>
    )
}

export default CategoriesDropdown
import React from 'react'
import { Col, Dropdown } from 'react-bootstrap'

function CategoriesDropdown(props) {
    return (
        <Col className='mx-auto mb-3'>
            <Dropdown>
                <Dropdown.Toggle variant='outilne-dark'>Categories</Dropdown.Toggle>
                <Dropdown.Menu className='px-3'>
                    {props.categories ? 
                        props.categories.map(
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
                        : 
                            props.categories === undefined ?
                            <p>
                                <span className="spinner-border spinner-border-sm text-center" role="status" aria-hidden="true"></span>
                            </p>
                            :
                                <p>Error</p>
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Col>       
        
    )
}

export default CategoriesDropdown
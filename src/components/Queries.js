import React from 'react'
import { Row } from 'react-bootstrap'
import Query from '../components/Query'

function Queries(props) {
    return (
        <Row>
            {(
                (props.formik.values.min && props.formik.values.max) &&
                props.formik.values.min <= props.formik.values.max
            ) ?
                    <Query 
                        text = {`Between ${props.formik.values.min} and ${props.formik.values.max}`}
                        remove = {
                            ()=>{
                                props.formik.setFieldValue('max', '')
                                props.formik.setFieldValue('min', '')
                                props.formik.submitForm()
                            }
                        }
                    />
                :
                    props.formik.values.min ?
                    <Query 
                        text = {`Minimum: ${props.formik.values.min}`}
                        remove = {
                            ()=>{
                                props.formik.setFieldValue('min', '')
                                props.formik.submitForm()
                            }
                        }
                    />:

                    props.formik.values.max &&
                    <Query 
                        text = {`Maximum: ${props.formik.values.max}`}
                        remove = {
                            ()=>{
                                props.formik.setFieldValue('max', '')
                                props.formik.submitForm()
                            }
                        }
                    />
            }

            {props.formik.values.title &&
                <Query 
                text = {`Title: ${props.formik.values.title}`}
                remove = {
                    ()=>{
                        props.formik.setFieldValue('title', '')
                        props.formik.submitForm()
                    }
                }
            />
            }

            {props.formik.values.artist_name &&
                <Query 
                    text = {`Artist: ${props.formik.values.artist_name}`}
                    remove = {
                        ()=>{
                            props.formik.setFieldValue('artist_name', '')
                            props.formik.submitForm()
                        }
                    }
                />
            }

            {props.formik.values.category_id &&
                <Query 
                    text = {`${
                        props.categories.find((cat)=>{
                            return cat.id === parseInt(props.formik.values.category_id)
                        }).cname
                    }`}
                    remove = {()=>{
                        props.formik.setFieldValue('category_id', '')
                        props.formik.submitForm()
                    }}
                />
            }

        </Row>
    )
}

export default Queries
import * as Yup from 'yup'
import UserDataComponent from '../../components/input/UserDataComponent'
import { useFormik } from 'formik'
import { Button, Col, Row, Form } from 'react-bootstrap'
import { order } from '../../fetching'
import useLoading from '../../hooks/useLoading'
import React from 'react'
import { json } from 'react-router-dom'

function CheckoutPage(props) {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email required")
            .email("Invalid email"),
        first_name: Yup.string()
            .required("Email required"),
        last_name:  Yup.string()
            .required("Email required"),
        address: Yup.string()
            .required("Email required"),
        phone_number: Yup.string()
            .required("Email required")
    })
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { 
            email: props.user.email || "",
            first_name: props.user.first_name || "",
            last_name: props.user.last_name || "",
            address: props.user.address || "",
            phone_number: props.user.phone_number || ""
        },

        validationSchema,

        onSubmit: (values) => {
            order(values).then(
                window.location = "receipt"
            )
        }
    })

    return (
        <>
            <form className='pb-5' onSubmit={formik.handleSubmit}>
                <UserDataComponent 
                    title={"Invoice Data"}
                    formik={formik}
                    changeUserData={false}
                    button={
                        <Row>
                            <Col className='text-center mb-5'>
                                <Button type='submit'>
                                    Order
                                </Button>
                            </Col>
                    </Row>
                    }
                />
            </form>
        </>
    )
}

export default CheckoutPage
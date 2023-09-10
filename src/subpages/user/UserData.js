import React from 'react'
import { logIn } from '../../fetching'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import { faUser, faKey, faQuestion, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import UserDataInputComponents from '../../components/UserDataInputComponent'

function UserData(props) {
    const formik = useFormik({
        initialValues: { 
            email: props.user.email,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            address: props.user.address || "",
            phone_number: props.user.phone_number || ""
        },

        validationSchema : Yup.object().shape({
            email: Yup.string()
                .email("Invalid email"),
            first_name: Yup.string(),
            last_name:  Yup.string(),
            address: Yup.string(),
            phone_number: Yup.string()
        }),


    })

    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>User Data</h1>
            </Row>
            <Row className='pb-5'> 
                <Col className='mx-5 pb-5'>
                    <UserDataInputComponents 
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        icon={faUser}
                        showAsterisk={formik.errors.email && formik.touched.email}
                        error={formik.errors.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />

                    <UserDataInputComponents 
                        label="First Name"
                        name="first_name"
                        type="text"
                        placeholder="Enter First Name"
                        icon={faQuestion}
                        showAsterisk={formik.errors.first_name && formik.touched.first_name}
                        error={formik.errors.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                    />

                    <UserDataInputComponents 
                        label="Last Name"
                        name="last_name"
                        type="text"
                        placeholder="Enter Last Name"
                        icon={faQuestion}
                        showAsterisk={formik.errors.last_name && formik.touched.last_name}
                        error={formik.errors.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                    />

                    <UserDataInputComponents 
                        label="Address"
                        name="address"
                        type="textarea"
                        placeholder="Enter Address"
                        icon={faHouse}
                        showAsterisk={formik.errors.address && formik.touched.address}
                        error={formik.errors.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                    />

                    <UserDataInputComponents 
                        label="Phone Number"
                        name="phone_number"
                        type="text"
                        placeholder="Enter Phone Number"
                        icon={faPhone}
                        showAsterisk={formik.errors.phone_number && formik.touched.phone_number}
                        error={formik.errors.phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone_number}
                    />

                    <ToastContainer position='top-right' />
                </Col>
            </Row>
        </Container>
    )
}

export default UserData


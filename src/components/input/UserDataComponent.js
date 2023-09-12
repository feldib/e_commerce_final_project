import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { faUser, faQuestion, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify'
import UserDataInputComponents from './UserDataInputComponent'
import SubPageTitle from '../SubPageTitle'

function UserDataChangingComponent(props) {
    return (
        <Container className='mb-5'>
            <SubPageTitle title={`${props.title}`} />

            <Row className='mb-5 floating-element'> 
                <Col className='mx-5 mb-5'>
                    <UserDataInputComponents 
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        icon={faUser}
                        showAsterisk={props.formik.errors.email && props.formik.touched.email}
                        error={props.formik.errors.email}
                        onChange={props.formik.handleChange}
                        onBlur={props.formik.handleBlur}
                        value={props.formik.values.email}
                        changeUserData={props.changeUserData}
                    />

                    <UserDataInputComponents 
                        label="First Name"
                        name="first_name"
                        type="text"
                        placeholder="Enter First Name"
                        icon={faQuestion}
                        showAsterisk={props.formik.errors.first_name && props.formik.touched.first_name}
                        error={props.formik.errors.first_name}
                        onChange={props.formik.handleChange}
                        onBlur={props.formik.handleBlur}
                        value={props.formik.values.first_name}
                        changeUserData={props.changeUserData}
                    />

                    <UserDataInputComponents 
                        label="Last Name"
                        name="last_name"
                        type="text"
                        placeholder="Enter Last Name"
                        icon={faQuestion}
                        showAsterisk={props.formik.errors.last_name && props.formik.touched.last_name}
                        error={props.formik.errors.last_name}
                        onChange={props.formik.handleChange}
                        onBlur={props.formik.handleBlur}
                        value={props.formik.values.last_name}
                        changeUserData={props.changeUserData}
                    />

                    <UserDataInputComponents 
                        label="Address"
                        name="address"
                        type="textarea"
                        placeholder="Enter Address"
                        icon={faHouse}
                        showAsterisk={props.formik.errors.address && props.formik.touched.address}
                        error={props.formik.errors.address}
                        onChange={props.formik.handleChange}
                        onBlur={props.formik.handleBlur}
                        value={props.formik.values.address}
                        changeUserData={props.changeUserData}
                    />

                    <UserDataInputComponents 
                        label="Phone Number"
                        name="phone_number"
                        type="text"
                        placeholder="Enter Phone Number"
                        icon={faPhone}
                        showAsterisk={props.formik.errors.phone_number && props.formik.touched.phone_number}
                        error={props.formik.errors.phone_number}
                        onChange={props.formik.handleChange}
                        onBlur={props.formik.handleBlur}
                        value={props.formik.values.phone_number}
                        changeUserData={props.changeUserData}
                    />

                    <ToastContainer position='top-right' />
                </Col>
            </Row>
        </Container>
    )
}

export default UserDataChangingComponent;
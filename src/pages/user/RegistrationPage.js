import React from 'react'
import { registerNewUser } from '../../fetching'
import { logIn } from '../../fetching'
import InputComponent from '../../components/InputComponent'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { faUser, faKey, faQuestion, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

const attemptRegistration = async (values, settleSuccessfulRegistration) => {
    await registerNewUser(values.email, values.password, values.firstName, values.lastName, values.address, values.phone)
        .then(function (response) {
            console.log("reponse: ", JSON.stringify(response))
            if(response.data === true){
                logIn(values.email, values.password, settleSuccessfulRegistration)
            }else{
                throw Error("Wrong email or password")
            }
        })
}

function RegistrationPage(props) {

    const initialValues = {
        email: '',
        repeatEmail: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
    }

    async function onSubmit(values){
        try{
            await attemptRegistration(values, props.settleSuccessfulRegistration)
            toast.success("Registration successful", {
                className: "toast-success"
            })
        }catch(error){
            toast.error("A user is registered with email already", {
                className: "toast-error"
            })
        }
    }

    const registrationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email required")
            .email("Invalid email"),
        repeatEmail: Yup.string()
            .required("Repeat email required")
            .oneOf([Yup.ref("email")], 'Must match email'),
        password: Yup.string()
            .required("Password required"),
        repeatPassword: Yup.string()
            .required("Repeat password required")
            .oneOf([Yup.ref("password")], 'Must match password'),
        firstName: Yup.string()
            .required("First name required"),
        lastName:  Yup.string()
            .required("Last name required"),
        address:  Yup.string()
            .required("Address name required")
    })

    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Register</h1>
            </Row>
            <Row className='pb-5'> 
                <Col className='mx-5 pb-5'>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={registrationSchema}
                    >     
                        {({errors, touched})=>(       
                            <Form>        
                                <InputComponent 
                                    label="Email address"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    icon={faUser}
                                    showAsterisk={errors.email && touched.email}
                                />

                                <InputComponent 
                                    label="Email address again"
                                    name="repeatEmail"
                                    type="email"
                                    placeholder="Enter email again"
                                    icon={faUser}
                                    showAsterisk={errors.repeatEmail&& touched.repeatEmail}
                                />

                                <InputComponent 
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    icon={faKey}
                                    showAsterisk={errors.password && touched.password}
                                />

                                <InputComponent 
                                    label="Password"
                                    name="repeatPassword"
                                    type="password"
                                    placeholder="Enter password"
                                    icon={faKey}
                                    showAsterisk={errors.repeatPassword && touched.repeatPassword}
                                />

                                <InputComponent 
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                    placeholder="Enter First Name"
                                    icon={faQuestion}
                                    showAsterisk={errors.firstName && touched.firstName}
                                />

                                <InputComponent 
                                    label="First Name"
                                    name="lastName"
                                    type="text"
                                    placeholder="Enter Last Name"
                                    icon={faQuestion}
                                    showAsterisk={errors.lastName && touched.lastName}
                                />

                                <InputComponent 
                                    label="Address"
                                    name="address"
                                    type="text"
                                    placeholder="Enter Address"
                                    icon={faHouse}
                                    showAsterisk={errors.address && touched.address}
                                />

                                <InputComponent 
                                    label="Phone Number"
                                    name="phone"
                                    type="text"
                                    placeholder="Enter Phone Number"
                                    icon={faPhone}
                                    showAsterisk={errors.phone && touched.phone}
                                />

                                <Button variant="primary" type="submit" onClick={
                                    ()=>{
                                        Object.keys(errors).length && (
                                            toast.error("Incorrect data", {
                                            className: "toast-error"
                                        })
                                        )
                                    }
                                }>
                                    Register
                                </Button>
                                <ToastContainer position='top-right' />
                            </Form>    
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    )
}

export default RegistrationPage
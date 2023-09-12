import React from 'react'
import { Link } from 'react-router-dom'
import { logIn } from '../../fetching'
import InputComponent from '../../components/input/InputComponent'
import { Col, Container, Row, Button, InputGroup } from 'react-bootstrap'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import PageTitle from '../../components/PageTitle'

function SignInPage(props) {
    const initialValues = {
        email: '',
        password: ''
    }

    async function onSubmit(values){
        try{
            await logIn(values.email, values.password, props.settleSuccessfulLogIn)
            toast.success("Logged in", {
                className: "toast-success"
            })
        }catch(error){
            toast.error("Incorrect email or password", {
                className: "toast-error"
            })
        }
    }

    const signInSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email required")
            .email("Invalid email"),
        password: Yup.string()
            .required("Password required")
    })

    return (
        <Container className='pb-5'>
            <PageTitle 
                title="Log In"
            />

            <Formik
                initialValues={initialValues}
                validationSchema={signInSchema}
                onSubmit={onSubmit}
            >
                {({errors, touched})=>(
                    <Row className='floating-element'>
                        <Row>
                            <Col className='mx-3 pb-5'>
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
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        icon={faKey}
                                        showAsterisk={errors.password && touched.password}
                                    />
            
                                    <Button variant="primary" type="submit">
                                        Sign In
                                    </Button>
                                    <ToastContainer position='top-right'/>
                                </Form>
                            </Col>
                        </Row>

                        <Row className='mx-5 pt-3'>
                            <Col>
                                <Link
                                    to="/forgot_password"
                                >
                                Forgot password
                                </Link>
                            </Col>
                        </Row>
                    </Row>
                )
                }
            </Formik>
        </Container>
    )
}

export default SignInPage
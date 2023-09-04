import React from 'react'
import { Link } from 'react-router-dom'
import { logIn } from '../../fetching'
import InputComponent from '../../components/InputComponent'
import { Col, Container, Row, Button, InputGroup } from 'react-bootstrap'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

function SignInPage(props) {
    const initialValues = {
        email: '',
        password: ''
    }

    async function onSubmit(values){
        await logIn(values.email, values.password, props.settleSuccessfulLogIn)
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
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Log In</h1>
            </Row>

            <Formik
                initialValues={initialValues}
                validationSchema={signInSchema}
                onSubmit={onSubmit}
            >
                {({errors, touched})=>(
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
                            </Form>
                        </Col>
                    </Row>
                )
                }
            </Formik>


            <Row className='mx-5 pt-3'>
                <Col>
                    <Link
                        to="/forgot_password"
                    >
                    Forgot password
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default SignInPage
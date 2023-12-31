import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { logIn } from '../../fetching'
import InputComponent from '../../components/input/InputComponent'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import PageTitle from '../../components/PageTitle'

function SignInPage(props) {

    const {to_checkout} = useLocation().state || false

    const initialValues = {
        email: '',
        password: ''
    }

    async function onSubmit(values){
        try{
            await logIn(values.email, values.password, (userData)=>{
                props.settleSuccessfulLogIn(to_checkout, userData)
            })
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
        <Container className='px-3 pb-5'>
            <PageTitle 
                title="Log In"
            />

            <Formik
                initialValues={initialValues}
                validationSchema={signInSchema}
                onSubmit={onSubmit}
            >
                {({errors, touched})=>(
                    <Row className='mx-auto floating-element'>
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
                                    <ToastContainer position='bottom-right'/>
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
import React from 'react'
import { changePassword } from '../../fetching'
import { Container, Row, Col, Button } from 'react-bootstrap'
import InputComponent from '../../components/input/InputComponent'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import PageTitle from '../../components/PageTitle'

function ResetPassword() {

    const initialValues = {
        password: '',
        repeatPassword: ''
    }

    const search = useLocation().search

    const onSubmit = (values) => {
        const token = new URLSearchParams(search).get('token')
        const email = new URLSearchParams(search).get('email')
        changePassword(token, email, values.password).then(()=>{
            toast.success("Password changed successfully", {
                className: "toast-success"
            })
            window.location = "/login"
        }).catch(()=>{
            toast.error("Error: couldn't change password", {
                className: "toast-error"
            })
        })
    }

    const resetPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password required"),
        repeatPassword: Yup.string()
            .required("Repeat password required")
            .oneOf([Yup.ref("password")], 'Must match password'),
    })

    return (
        <Container className='pb-5'>
             <PageTitle 
                title="Reset Password"
            />
            <Row className='floating-element'>
                <Col className='mx-5 pb-5'>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={resetPasswordSchema}
                    >
                        {({errors, touched})=>(
                            <Form>
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
                                    placeholder="Enter repeat password"
                                    icon={faKey}
                                    howAsterisk={errors.repeatPassword && touched.repeatPassword}
                                />
        
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    onClick={
                                        ()=>{
                                            Object.keys(errors).length && (
                                                toast.error("Incorrect data", {
                                                className: "toast-error"
                                            })
                                            )
                                        }
                                    }
                                >
                                    Change password
                                </Button>
                                <ToastContainer position='bottom-right' />
                            </Form>
                        )}
                    </Formik>
                    
                </Col>
            </Row>
        </Container>
        )
}

export default ResetPassword
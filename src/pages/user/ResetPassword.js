import React from 'react'
import { changePassword } from '../../fetching'
import { Container, Row, Col, Button } from 'react-bootstrap'
import InputComponent from '../../components/InputComponent'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

function ResetPassword() {

    const initialValues = {
        password: '',
        repeatPassword: ''
    }

    const search = useLocation().search

    const onSubmit = async (values) => {
        if(values.password === values.repeatPassword){
            const token = new URLSearchParams(search).get('token')
            const email = new URLSearchParams(search).get('email')
            await changePassword(token, email, values.password)
        }
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
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Reset password</h1>
            </Row>
            <Row>
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
        
                                <Button variant="primary" type="submit">
                                    Change password
                                </Button>
        
                            </Form>
                        )}
                    </Formik>
                    
                </Col>
            </Row>
        </Container>
        )
}

export default ResetPassword
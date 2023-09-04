import React from 'react'
import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { sendForgotPasswordEmail } from '../../fetching'
import InputComponent from '../../components/InputComponent'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

function ForgotPasword() {
    const [displayMessage, setDisplayMessage] = React.useState(false)

    const initialValues = {
        email: ''
    }

    const onSubmit = async (values) => {
        if(values.email){
            await sendForgotPasswordEmail(values.email)
            setDisplayMessage(true)
        }
    }

    const forgotPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email required")
            .email("Invalid email")
    })

    return (
        <Container className='pb-5'>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Send email to reset password</h1>
            </Row>     
                <Formik
                    initialValues={initialValues}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={onSubmit}
                >
                    {({errors, touched})=>(
                        <Row>
                            <Col className='mx-5 pb-5'>
                            <Form>
                                <InputComponent 
                                    label="Email address"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    icon={faUser}
                                    showAsterisk={errors.email && touched.email}
                                />
                                {displayMessage && 
                                    <p className="text-muted">
                                        If a user is registered with this email, a password recovery link was sent to them
                                    </p>
                                }
                                <Button variant="primary" type="submit">
                                    Send link
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    )}
                </Formik>
        </Container>
        )
}

export default ForgotPasword
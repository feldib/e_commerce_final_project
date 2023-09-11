import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container, Button, InputGroup, FloatingLabel, Form as RBForm } from 'react-bootstrap'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import InputComponent from '../../components/InputComponent'
import { sendMessageToAdministrator } from '../../fetching'

function ContactUsPage() {
    const initialValues = {
        email: '',
        title: '',
        message: ''
    }

    const contactUsSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email required")
            .email("Invalid email"),
        title: Yup.string()
            .required("Title required"),
        message: Yup.string()
            .required("Message required"),
    })

    const onSubmit = async (values) => {
        try{
            await sendMessageToAdministrator(values.email, values.title, values.message)
            toast.success("Message sent", {
                className: "toast-success"
            })
        }catch(error){
            toast.error("Error: couldn't send message", {
                className: "toast-error"
            })
        }
    }

    return (
        <Container>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Contact us</h1>
            </Row>
            <Row>
                <Col sm={12} md={5} className='pb-5'>
                    <Row>
                        <h2>Company details</h2>
                    </Row>

                    <Row>
                        <p>Name: Artwork Market</p>
                        <p>Address: Budapest, Hungary</p>
                        <p>Phone: +36 xx xxx xxxx</p>
                    </Row>
                </Col>

                <Col sm={12} md={5} className='pb-5'>
                    <Row>
                        <h2>Message administrator</h2>
                    </Row>

                    <Row>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={contactUsSchema}
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
                                    label="Title"
                                    name="title"
                                    type="text"
                                    placeholder="Enter message title"
                                    icon={faKeyboard}
                                    showAsterisk={errors.title && touched.title}
                                />

                                <RBForm.Group className="mb-3">
                                    <RBForm.Label>Message</RBForm.Label>
                                    {errors.message && touched.message &&
                                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>
                                    }
                                    <FloatingLabel>
                                        <Field
                                            className="form-control" 
                                            name='message'
                                            as="textarea"
                                            placeholder="Enter message"
                                            style={{ height: '100px' }}
                                        />
                                    </FloatingLabel>
                                    <ErrorMessage 
                                        component="div"
                                        className='input-error-message'
                                        name="message"
                                    />
                                </RBForm.Group>

                                <Button variant="primary" type="submit" onClick={
                                        ()=>{
                                            Object.keys(errors).length && (
                                                toast.error("Incorrect data", {
                                                className: "toast-error"
                                            })
                                            )
                                        }
                                    }>
                                    Send
                                </Button>
                                <ToastContainer position='top-right' />
                            </Form>
                        )} 
                    </Formik>
                        
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactUsPage;
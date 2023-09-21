import React from 'react'
import { Button, Col, Row, Form as RBForm, FloatingLabel} from 'react-bootstrap'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import InputComponent from '../components/input/InputComponent'
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup'
import { replyToMessage } from '../fetching'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard, faAsterisk } from '@fortawesome/free-solid-svg-icons'

function UnansweredMessage(props) {
    const [replying, setReplying] = React.useState(false)
    const [replied, setReplied] = React.useState(false)

    const initialValues = {
        reply_title: '',
        reply_text: ''
    }

    const onSubmit = (values) => {
        replyToMessage(props.message.id, props.message.email, values.reply_title, values.reply_text).then(()=>{
            toast.success("Reply sent successfully", {
                className: "toast-success"
            })
            setReplied(true)
        }).catch(()=>{
            toast.error("Error: couldn't send reply", {
                className: "toast-error"
            })
        })
    }

    const resetPasswordSchema = Yup.object().shape({
        reply_title: Yup.string()
            .required("Title required"),
        reply_text: Yup.string()
            .required("Reply required"),
    })

    return (
        <Row className='mx-auto mb-5 floating-element p-3'> 
            {replied ?
                <Col>
                    <h4>Reply sent successfully!</h4>
                </Col>
            :
                <Col>
                    <Row>
                        <h4 className='text-center'>{props.message.message_title}</h4>
                    </Row>

                    <Row>
                        <h5 className='text-center'>{props.message.email}</h5>
                    </Row>
                    
                    <Row>
                        <p>{props.message.message_txt}</p>
                    </Row>

                    <Row>
                        <Col>
                            {!replying ?
                                <Button 
                                    type="submit" 
                                    variant="primary"
                                    onClick={()=>{setReplying(true)}}
                                >
                                    Reply
                                </Button>
                            :
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                validationSchema={resetPasswordSchema}
                            >
                                {({errors, touched})=>(
                                    <Form>
                                        <InputComponent 
                                            label="Title"
                                            name="reply_title"
                                            type="textarea"
                                            placeholder="Enter title"
                                            icon={faKeyboard}
                                            showAsterisk={errors.reply_title && touched.reply_title}
                                        />

                                        <RBForm.Group className="mb-3">
                                            <RBForm.Label>Message</RBForm.Label>
                                            {errors.reply_text && touched.reply_text &&
                                                <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>
                                            }
                                            <FloatingLabel>
                                                <Field
                                                    className="form-control" 
                                                    name='reply_text'
                                                    as="textarea"
                                                    placeholder="Enter reply"
                                                    style={{ height: '100px' }}
                                                />
                                            </FloatingLabel>
                                            <ErrorMessage 
                                                component="div"
                                                className='input-error-message'
                                                name="reply_text"
                                            />
                                        </RBForm.Group>
            
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
                                            Send
                                        </Button>
                                        <ToastContainer position='bottom-right' />
                                    </Form>
                                )}
                            </Formik>
                            }
                            
                        </Col>
                    </Row>
                </Col>
            }   
        </Row>
    )
}

export default UnansweredMessage
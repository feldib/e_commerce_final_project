import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Button, InputGroup, FloatingLabel, Form as RBForm} from 'react-bootstrap'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import InputComponent from './input/InputComponent'
import { leaveReview } from '../fetching'

function LeaveReview(props) {

    const form = React.useRef()

    const initialValues = {
        title: '',
        review_text: ''
    }

    const reviewSchema = Yup.object().shape({
        title: Yup.string()
            .required("Review required"),
        review_text: Yup.string()
            .required("Review text required"),
    })

    const onSubmit = async (values) => {
        try{
            await leaveReview(props.artwork_id, values.title, values.review_text)
            toast.success("Review saved", {
                className: "toast-success"
            })
            toast.info("The review has to be approved by the administrator", {
                className: "toast-info"
            })
            form.current.reset()
        }catch(error){
            toast.error("Error: couldn't save review", {
                className: "toast-error"
            })
        }
    }

    return (
        <Row className='mx-5 mt-5 mb-5 floating-element'>
            <Col >
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={reviewSchema}
                >     
                    {({errors, touched})=>(
                        <Form ref={form}>
                            <RBForm.Group className="mb-3">
                                <RBForm.Label>
                                    <h4>Add a review</h4>
                                </RBForm.Label>
        
                                {props.loggedIn ?
                                    <>
                                        <InputComponent 
                                            label="Title"
                                            name="title"
                                            type="text"
                                            placeholder="Enter review title"
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
                                                    name='review_text'
                                                    as="textarea"
                                                    placeholder="Enter review text"
                                                    style={{ height: '100px' }}
                                                />
                                            </FloatingLabel>
                                            <ErrorMessage 
                                                component="div"
                                                className='input-error-message'
                                                name="review_text"
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
                                            Submit
                                        </Button>
                                    </>
                                :
                                    <p>You have to be logged in to leave a review!</p>
                                }
                                
                            </RBForm.Group>  
                        </Form>
                    )}
                </Formik>

            </Col>
            
        </Row>
    )
}

export default LeaveReview;
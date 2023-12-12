import * as Yup from 'yup'
import UserDataComponent from '../../components/input/UserDataComponent'
import { useFormik } from 'formik'
import { Button, Col, Row } from 'react-bootstrap'
import { order } from '../../fetching'
import React from 'react'
import { UserDataContext } from '../../App.js'
import { useNavigate } from 'react-router-dom'

function CheckoutPage(props) {

    const navigate = useNavigate()

    const {user, loggedIn} = React.useContext(UserDataContext)


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email required")
            .email("Invalid email"),
        first_name: Yup.string()
            .required("Email required"),
        last_name:  Yup.string()
            .required("Email required"),
        address: Yup.string()
            .required("Email required"),
        phone_number: Yup.string()
            .required("Email required")
    })
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { 
            email: user.email || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            address: user.address || "",
            phone_number: user.phone_number || ""
        },

        validationSchema,

        onSubmit: (values) => {
            order(values).then(
                navigate("/receipt")
            )
        }
    })

    return (
        <>
            <form className='pb-5' onSubmit={formik.handleSubmit}>
                <UserDataComponent 
                    title={"Invoice Data"}
                    formik={formik}
                    checkout={true}
                    button={
                        <Row>
                            <Col className='text-center mb-5'>
                                <Button type='submit'>
                                    Order
                                </Button>
                            </Col>
                    </Row>
                    }
                />
            </form>
        </>
    )
}

export default CheckoutPage
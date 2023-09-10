import * as Yup from 'yup'
import UserDataComponent from '../../components/UserDataComponent'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { Button, Col, Row, Form } from 'react-bootstrap'
import { order } from '../../fetching'

function CheckoutPage(props) {
    const formik = useFormik({
        initialValues: { 
            email: props.user.email,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            address: props.user.address || "",
            phone_number: props.user.phone_number || ""
        },

        validationSchema : Yup.object().shape({
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
        }),

        onSubmit: (values) => {
            order(values).then(
                window.location.replace("receipt")
            )
        }
    })
    return (
        <form className='pb-5' onSubmit={formik.handleSubmit}>
            <UserDataComponent 
                title={"Invoice Data"}
                formik={formik}
                changeUserData={false}
            />
            <Row>
                <Col className='text-center mb-5'>
                    <Button type='submit'>
                        Order
                    </Button>
                </Col>
            </Row>
        </form>
    )
}

export default CheckoutPage
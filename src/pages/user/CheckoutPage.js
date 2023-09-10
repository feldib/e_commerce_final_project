import * as Yup from 'yup'
import UserDataComponent from '../../components/UserDataComponent'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'

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
    })
    return (
        <Row className='pb-5'>
            <UserDataComponent 
                title={"Invoice Data"}
                formik={formik}
                changeUserData={false}
            />
            <Row>
                <Col className='text-center mb-5'>
                    <Link to="/checkout">
                        <Button>
                            Order
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Row>
    )
}

export default CheckoutPage
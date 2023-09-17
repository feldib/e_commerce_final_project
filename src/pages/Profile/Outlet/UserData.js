import React from 'react'
import * as Yup from 'yup'
import UserDataComponent from '../../../components/input/UserDataComponent'
import { useFormik } from 'formik'

function UserData(props) {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email required"),
        first_name: Yup.string()
            .required("Email required"),
        last_name:  Yup.string()
            .required("Email required"),
        address: Yup.string(),
        phone_number: Yup.string()
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { 
            email: props.user.email,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            address: props.user.address || "",
            phone_number: props.user.phone_number || ""
        },

        validationSchema,


    })

    return (
        <UserDataComponent 
            title={"User Data"}
            formik={formik}
            changeUserData={true}
        />
    )
}

export default UserData


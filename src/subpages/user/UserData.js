import React from 'react'
import * as Yup from 'yup'
import UserDataComponent from '../../components/UserDataComponent'
import { useFormik } from 'formik'

function UserData(props) {
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
                .email("Invalid email"),
            first_name: Yup.string(),
            last_name:  Yup.string(),
            address: Yup.string(),
            phone_number: Yup.string()
        }),


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


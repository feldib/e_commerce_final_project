import React from 'react'
import * as Yup from 'yup'
import UserDataComponent from '../../../components/input/UserDataComponent'
import { useFormik } from 'formik'
import { UserDataContext } from '../../../App'

function UserData(props) {
    const {user, loggedIn} = React.useContext(UserDataContext)
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
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address || "",
            phone_number: user.phone_number || ""
        },

        validationSchema,


    })

    return (
        <UserDataComponent 
            title={"User Data"}
            formik={formik}
        />
    )
}

export default UserData


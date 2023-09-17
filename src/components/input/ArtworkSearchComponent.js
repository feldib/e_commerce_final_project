import React from 'react'
import useAxios from '../../hooks/useAxios'
import { getArtworkSearchResults } from '../../fetching'
import { Row, Button, Form } from 'react-bootstrap'
import BuyTable from '../../components/tables/BuyTable'
import AdminArtworkTable from '../../components/tables/AdminArtworkTable'
import ArtworkSearchFields from './ArtworkSearchFields'
import Queries from '../Queries'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function ArtworkSearchComponent(props) {
    async function search(values){
        const qs = []
        for (const [key, value] of Object.entries(values)) {
            if(value){
                qs.push(
                    `${key}=${value}`
                )
            }
        }
        await getArtworkSearchResults(qs, setSearchResults)
    }


    const formik = useFormik({
        initialValues: { 
            title: "", 
            artist_name: "", 
            category_id: "", 
            order: "asc", 
            n: 10,
            min: "",
            max: ""
        },

        onSubmit: (values) => search(values),

        validationSchema: Yup.object().shape({
            min: Yup.number()
                .min()
        })

    })

    const categories = useAxios("/categories")

    const [searchResults, setSearchResults] = React.useState()

    return (
        <Form onSubmit={formik.handleSubmit}>
            <ArtworkSearchFields 
                formik={formik}
                categories={categories}
            />

            <Queries formik={formik} categories={categories} />

            {searchResults &&
                <Row className="floating-element mt-5 mb-5">
                    <Row className='mb-3 mt-2'>
                        <h3 className='text-center'>Search results</h3>
                    </Row>
                    {props.admin ?
                        <AdminArtworkTable 
                            dataLines = {searchResults}
                            loggedIn = {props.loggedIn}
                        />
                    :
                        <BuyTable 
                            reccomendation = {false}
                            theadNeeded = {true}
                            dataLines = {searchResults}
                            loggedIn = {props.loggedIn}
                        />
                    }
                    
                </Row>
            }
            </Form>
    )
}

export default ArtworkSearchComponent
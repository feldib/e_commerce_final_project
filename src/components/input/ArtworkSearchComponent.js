import React from 'react'
import useAxios from '../../hooks/useAxios'
import { getArtworkSearchResults } from '../../fetching'
import { Row, Form, Col, Button } from 'react-bootstrap'
import BuyTable from '../../components/tables/BuyTable'
import AdminArtworkTable from '../../components/tables/AdminArtworkTable'
import ArtworkSearchFields from './ArtworkSearchFields'
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

    const [pageNumber, setPageNumber] = React.useState(1)

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: { 
            title: "", 
            artist_name: "", 
            category_id: "", 
            order: "asc", 
            n: "10",
            min: "",
            max: "",
            offset: 0
        },

        onSubmit: (values) => search(values),

        validationSchema: Yup.object().shape({
            min: Yup.number()
                .min(0),
            max: Yup.number()
                .min(1),
        })

    })

    const categories = useAxios("/categories")

    const [searchResults, setSearchResults] = React.useState()

    const results = React.useRef()

    return (
        <Form onSubmit={formik.handleSubmit}>
            <ArtworkSearchFields 
                formik={formik}
                categories={categories}
            />

            {searchResults &&

                    <Row className="floating-element mt-5 mb-5">
                        <Row className='mb-3 mt-2' ref={results}>
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

                    {formik.values.n <= searchResults.length &&
                        <Row className="pb-5 text-center">

                            {pageNumber !== 1 &&

                            <Col className="mx-auto">
                                <Button onClick={(e)=>{
                                    setPageNumber( pageNumber - 1 )
                                    formik.setFieldValue("offset", pageNumber / parseInt(formik.values.n))
                                    formik.handleSubmit(formik.values)
                                    results.current.scrollIntoView({behaviour: "instant"})
                                }}>
                                    Back {formik.values.n}
                                </Button>
                            </Col>

                            }

                            <Col className="mx-auto">
                                <Button onClick={(e)=>{
                                    setPageNumber( pageNumber + 1 )
                                    formik.setFieldValue("offset", pageNumber * parseInt(formik.values.n))
                                    formik.handleSubmit(formik.values)
                                    results.current.scrollIntoView({behaviour: "instant"})
                                }}>
                                    Next {formik.values.n}
                                </Button>
                            </Col>
                        </Row>
                    }
                    </Row>                 
            }
            </Form>
    )
}

export default ArtworkSearchComponent
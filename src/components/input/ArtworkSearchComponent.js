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

    const [searchResults, setSearchResults] = React.useState()

    const [pageNumber, setPageNumber] = React.useState(0)

    async function search(values){
        const results = await getArtworkSearchResults(values, pageNumber)
        setSearchResults(results)
        
    }

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: { 
            title: "", 
            artist_name: "", 
            category_id: "", 
            order: "asc", 
            n: "5",
            min: "",
            max: "",
        },

        onSubmit: (values) => {
            setPageNumber(1)
            search(values)
        },

        validationSchema: Yup.object().shape({
            min: Yup.number()
                .min(0),
            max: Yup.number()
                .min(1),
        })

    })

    const categories = useAxios("/categories")

    const results = React.useRef()

    React.useEffect(()=>{
        if(pageNumber){
            search(formik.values)
        }
    }, [pageNumber])

    return (
        <Form onSubmit={formik.handleSubmit}>
            <ArtworkSearchFields 
                formik={formik}
                categories={categories}
                resetPageNumber={()=>{
                    setPageNumber(1)
                }}
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

                        <Row className="pt-3 pb-3 text-center">

                            {pageNumber > 1 &&

                            <Col className="mx-auto">
                                <Button 
                                    className='submit'
                                    onClick={(e)=>{
                                        setPageNumber( pageNumber - 1 )
                                        results.current.scrollIntoView({behaviour: "instant"})
                                    }}
                                >
                                    Back {formik.values.n}
                                </Button>
                            </Col>

                            }

                            {searchResults.length >= pageNumber * formik.values.n &&

                            <Col className="mx-auto">
                                <Button 
                                    className='submit'
                                    onClick={async (e)=>{
                                        setPageNumber( pageNumber + 1 )
                                        results.current.scrollIntoView({behaviour: "instant"})
                                    }}
                                >
                                    Next {formik.values.n}
                                </Button>
                            </Col>
                            }
                        </Row>
                    </Row>                 
            }
            </Form>
    )
}

export default ArtworkSearchComponent
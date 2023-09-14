import React from 'react'
import NewArtworkInputComponent from '../../../components/input/NewArtworkInputComponent'
import { Container, Col, Row, Button, Form, Dropdown } from 'react-bootstrap'
import { faDollarSign, faQuestion, faImages, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import PageTitle from '../../../components/PageTitle'
import FloatingBackButton from '../../../components/buttons/FloatingBackButton'
import useAxios from '../../../hooks/useAxios'
import useLoading from '../../../hooks/useLoading'
import { json, useNavigate } from 'react-router-dom'
import { WithContext as ReactTags } from 'react-tag-input'
import { addNewArtwork } from '../../../fetching'

function AddNewArtworkPage(props) {

    const categories = useAxios("/categories")

    const categoriesRepresented = useLoading(categories, 
        (categories)=>{
            return categories.map(
                (cat)=>{
                    return (
                        <Dropdown.Item
                            eventKey={JSON.stringify(cat)}
                        >
                            {cat.cname}
                        </Dropdown.Item>
                    )
                }
            )
        }
    )

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: '',
            artist_name: '',
            price: '',
            tags: [],
            quantity: '',
            category_id: '',
            thumbnail: '',
            other_pictures: [],
            description: ""
        },

        onSubmit: (values)=>{
            const tags = values.tags.map(obj => obj.text)
            const other_pictures = values.other_pictures.map(obj => obj.text)                

            addNewArtwork({...values, tags, other_pictures}).then((response)=>{
                toast.success("Artwork added successfully to database", {
                    className: "toast-success"
                })
            }).catch((error)=>{
                toast.error("Error: could not add artwork.", {
                    className: "toast-error"
                })
                console.log(error)
            })
            
        },

        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required("Title required"),
            artist_name: Yup.string()
                .required("Name required"),
            price: Yup.number()
                .required("Price required")
                .min(1),
            quantity: Yup.number()
                .required("Quantity required")
                .min(1),
            category_id: Yup.number()
                .required("Category required"),
            thumbnail: Yup.string()
                .required("Thumbnail is required!")
                .url("Please enter valid url"),
            tags: Yup.array()
                .min(3, "Add minimum 3 tags!")
                .of(
                    Yup.object().shape({
                        id: Yup.string(),
                        text: Yup.string()
                    })
                ),
            other_pictures: Yup.array()
                .of(
                    Yup.object().shape({
                        id: Yup.string(),
                        text: Yup.string().url("Please enter valid ur!")
                    })
                ),
            description: Yup.string()
                .required("Description required"),
        })

    })

    const KeyCodes = {
        comma: 188,
        enter: 13
    }
      
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const [tags, setTags] = React.useState([])

    const [imgUrls, setImgUrls] = React.useState([])

    React.useEffect(()=>{
        formik.setFieldValue("tags", tags)
    }, [tags])

    React.useEffect(()=>{
        formik.setFieldValue("other_pictures", imgUrls)
    }, [imgUrls])

    const createHandleDelete = (tgs, setTgs) => {
        return (i) => {
            setTgs(tgs.filter((tag, index) => index !== i));
        };
    }

    const createHandleAddition = (tgs, setTgs) => {
        return tag => {
            setTgs([...tgs, tag]);
        }
    }

    const [chosenCategory, setChoseCategory] = React.useState("Choose")

    return (
        <Container>
             <PageTitle 
                title="Add new artwork"
            />
            <Row className='pb-5 floating-element'> 
                <Col className='mx-5 pb-5 '>
                    <Form onSubmit={formik.handleSubmit}>

                        <NewArtworkInputComponent 
                            label="Title"
                            name="title"
                            type="text"
                            placeholder="Enter title"
                            icon={faQuestion}
                            formik={formik}
                        />

                        <NewArtworkInputComponent 
                            label="Artist"
                            name="artist_name"
                            type="text"
                            placeholder="Enter name of artist"
                            icon={faQuestion}
                            formik={formik}
                        />

                        <NewArtworkInputComponent 
                            label="Price"
                            name="price"
                            type="number"
                            placeholder="Enter price of artwork"
                            icon={faDollarSign}
                            formik={formik}
                        />

                        <Form.Group className="pb-3">
                            <Form.Label>Tags</Form.Label>
                            <ReactTags
                                tags={formik.values.tags}
                                // suggestions={suggestions}
                                delimiters={delimiters}
                                handleDelete={createHandleDelete(tags, setTags)}
                                handleAddition={createHandleAddition(tags, setTags)}
                                inputFieldPosition="bottom"
                                placeholder='Add new tag'
                                // autocomplete
                            />
                            {formik.errors.tags && 
                                <div
                                    className='input-error-message'
                                >
                                    {formik.errors.tags[0].text}
                                    {formik.errors.tags}
                                </div>
                            }
                        </Form.Group>
                        
                        
                        <NewArtworkInputComponent 
                            label="Quantity"
                            name="quantity"
                            type="number"
                            placeholder="Enter quantity"
                            icon={faQuestion}
                            formik={formik}
                        />

                        <Form.Group className="pb-3">
                            <Form.Label>Tags</Form.Label>
                                <Dropdown 
                                    value={formik.values.category_id}
                                    onSelect={(cat)=>{
                                        const obj = JSON.parse(cat)
                                        formik.setFieldValue("category_id", obj.id)
                                        setChoseCategory(obj.cname)
                                    }}
                                >
                                    <Dropdown.Toggle variant='outilne-dark'>
                                        {chosenCategory}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {categoriesRepresented}
                                    </Dropdown.Menu>
                                </Dropdown>
                            {formik.errors.category_id && 
                                <div
                                    className='input-error-message'
                                >
                                    {formik.errors.category_id}
                                </div>
                            }
                        </Form.Group>

                        <NewArtworkInputComponent 
                            label="Thumbnail"
                            name="thumbnail"
                            type="text"
                            placeholder="Enter thumbnail url"
                            icon={faImages}
                            formik={formik}
                        />

                        <Form.Group className="pb-3">
                            <Form.Label>Images</Form.Label>
                            <ReactTags
                                tags={formik.values.other_pictures}
                                // suggestions={suggestions}
                                delimiters={delimiters}
                                handleDelete={createHandleDelete(imgUrls, setImgUrls)}
                                handleAddition={createHandleAddition(imgUrls, setImgUrls)}
                                inputFieldPosition="bottom"
                                placeholder='Add new image URL'
                                inputProps = {{
                                    disabled: (formik.errors.other_pictures),
                                  }}
                                // autocomplete
                            />
                            {formik.errors.other_pictures && 
                                <div
                                    className='input-error-message'
                                >
                                    {formik.errors.other_pictures[0].text}
                                </div>
                            }
                        </Form.Group>

                        <NewArtworkInputComponent 
                            label="Description"
                            name="description"
                            type="textarea"
                            placeholder="Enter description"
                            icon={faQuestion}
                            formik={formik}
                        />

                        <Button variant="primary" type="submit" onClick={
                            ()=>{
                                Object.keys(formik.errors).length && (
                                    toast.error("Incorrect data", {
                                    className: "toast-error"
                                })
                                )
                            }
                        }>
                            Add new artwork
                        </Button>
                        <ToastContainer position='bottom-right' />
                    </Form>
                </Col>
            </Row>

            <FloatingBackButton 
                navigate={navigate}
            />
        </Container>
    )
}

export default AddNewArtworkPage

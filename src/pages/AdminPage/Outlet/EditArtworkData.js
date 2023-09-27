import React from 'react'
import ChangeArtworkDataInputComponent from '../../../components/input/ChangeArtworkDataInputComponent'
import { Container, Col, Row, Form, Dropdown, InputGroup } from 'react-bootstrap'
import { faAsterisk, faDollarSign, faQuestion, faImages, faX } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer } from 'react-toastify'
import PageTitle from '../../../components/PageTitle'
import FloatingBackButton from '../../../components/buttons/FloatingBackButton'
import useAxios from '../../../hooks/useAxios'
import useLoading from '../../../hooks/useLoading'
import { useNavigate, useParams } from 'react-router-dom'
import { WithContext as ReactTags } from 'react-tag-input'
import { updateArtworkData } from '../../../fetching'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { server_url } from '../../../utils/api_constants'
import { 
    addNewOtherPicture,
    replaceThumbnail,
    removePicture
} from '../../../fetching'

function EditArtworkData(props) {

    const {artwork_id} = useParams()
    const artworkData = useAxios(`/artwork?id=${artwork_id}`)

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

    const MAX_IMAGE_SIZE = 102400 //100KB

    const validImageExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp']

    function isValidImage(fileName) {
        return fileName && validImageExtensions.indexOf(fileName.split('.').pop()) > -1;
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            artist_name: "",
            price: "",
            tags: [],
            quantity: "",
            category_id: "",
            thumbnail: "",
            other_pictures: [],
            descript: ""
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
            thumbnail: Yup
                .mixed()
                .required("Thumbnail required")
                .test("is-valid-type", "Not a valid image type",
                    value => isValidImage(value && value.name)
                )
                .test("is-valid-size", "Max allowed size is 100KB",
                    value => value && value.size <= MAX_IMAGE_SIZE
                ),
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
                    Yup.mixed()
                        .test("is-valid-type", "Not a valid image type",
                            value => isValidImage(value && value.name)
                        )
                        .test("is-valid-size", "Max allowed size is 100KB",
                            value => value && value.size <= MAX_IMAGE_SIZE
                        )
                    ),
            description: Yup.string()
                .required("Description required"),
        })

    })


    const KeyCodes = {
        comma: 188,
        enter: 13,
        space: 32
    }
      
    const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

    const [tags, setTags] = React.useState([])

    const [imgUrls, setImgUrls] = React.useState([])

    React.useEffect(()=>{
        if(artworkData){

            formik.setValues(
                {
                    title: artworkData.title,
                    artist_name: artworkData.artist_name,
                    price: artworkData.price,
                    tags: artworkData.tags,
                    quantity: artworkData.quantity,
                    category_id: artworkData.category_id,
                    thumbnail: `${server_url}/${artworkData.thumbnail}`,
                    other_pictures: artworkData.other_pictures.map((pic)=>{
                        return `${server_url}/${pic}`
                    }),
                    descript: artworkData.descript
                }
            )
            setTags(artworkData.tags.map((obj)=>{
                return {id: obj.tname, text:obj.tname}
            }))
            
        }
    }, [artworkData])


    React.useEffect(()=>{
        formik.setFieldValue("tags", tags)
        if(tags.length >= 3){
            updateArtworkData(artwork_id, "tags", tags.map(
                (tag) => {
                    return { tname: tag.text } 
                }
            ))
        }
        
    }, [tags])

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
        <Container className='px-3'>
             <PageTitle 
                title="Edit artwork data"
            />
            <Row className='mx-auto pb-5 floating-element'> 
                <Col className='mx-5 pb-5 '>
                    <Form>

                        <ChangeArtworkDataInputComponent 
                            label="Title"
                            name="title"
                            type="text"
                            placeholder="Enter title"
                            icon={faQuestion}
                            formik={formik}
                            artwork_id={artwork_id}
                        />

                        <ChangeArtworkDataInputComponent 
                            label="Artist"
                            name="artist_name"
                            type="text"
                            placeholder="Enter name of artist"
                            icon={faQuestion}
                            formik={formik}
                            artwork_id={artwork_id}
                        />

                        <ChangeArtworkDataInputComponent 
                            label="Price"
                            name="price"
                            type="number"
                            placeholder="Enter price of artwork"
                            icon={faDollarSign}
                            formik={formik}
                            artwork_id={artwork_id}
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
                        
                        
                        <ChangeArtworkDataInputComponent 
                            label="Quantity"
                            name="quantity"
                            type="number"
                            placeholder="Enter quantity"
                            icon={faQuestion}
                            formik={formik}
                            artwork_id={artwork_id}
                        />

                        <Form.Group className="pb-3">
                            <Form.Label>Category</Form.Label>
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

                        <Form.Group className="pb-3">
                            <Form.Label>Thumbnail</Form.Label>
                            {formik.errors.thumbnail &&
                                <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>
                            }
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faImages} className='mx-3'/>
                                </InputGroup.Text>

                                <Form.Control 
                                    type="file" 
                                    placeholder="Upload thumbnail" 
                                    onChange={async (e)=>{
                                        await replaceThumbnail(artwork_id, e.target.files[0])
                                        formik.setFieldValue("thumbnail", URL.createObjectURL(e.target.files[0]))
                                    }}
                                />
                            </InputGroup>

                            {formik.values.thumbnail &&
                                <Col 
                                    className='mb-3 uploaded-image-container'
                                    style={{
                                        position: "relative",
                                        height: "150px",
                                        width: "150px",
                                    }}
                                >
                                    <img 
                                        src={formik.values.thumbnail}
                                        className='mt-3 uploaded-image'
                                    />

                                    <FontAwesomeIcon 
                                        icon={faX} 
                                        className='remove-uploaded-image'
                                        onClick={
                                            ()=>{
                                                formik.setFieldValue("thumbnail", "")
                                            }
                                        }
                                    />
                                </Col>
                            }

                            {formik.errors.thumbnail}
                        </Form.Group>

                        <Form.Group className="pb-3">
                            <Form.Label>Images</Form.Label>
                            {formik.errors.other_pictures &&
                                <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>
                            }
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faImages} className='mx-3'/>
                                </InputGroup.Text>

                                <Form.Control 
                                    type="file" 
                                    placeholder="Upload other pictures" 
                                    onChange={async(e)=>{                                        
                                        await addNewOtherPicture(artwork_id, e.target.files[0])

                                        formik.setFieldValue("other_pictures", [
                                            ...formik.values.other_pictures,
                                            URL.createObjectURL(e.target.files[0])
                                        ])
                                    }}
                                />
                            </InputGroup>

                            {formik.values.other_pictures &&
                                <Row>{formik.values.other_pictures.map((pic, index)=>{                                    
                                    return (
                                        <Col 
                                            key={index}
                                            className='mb-3 uploaded-image-container'
                                            style={{
                                                position: "relative",
                                                height: "150px",
                                                width: "150px",
                                            }}
                                        >
                                            <img 
                                                src={pic} 
                                                className='mt-3 uploaded-image'
                                            />

                                            <FontAwesomeIcon 
                                                icon={faX} 
                                                className='remove-uploaded-image'
                                                id={pic}
                                                onClick={
                                                    (e)=>{
                                                        const indexOfPicToRemove = formik.values.other_pictures.findIndex((pic)=>{
                                                            return pic === e.target.id
                                                        })

                                                        const newArray = formik.values.other_pictures.filter(
                                                            (pic, index)=>{
                                                                return index !== indexOfPicToRemove
                                                            }
                                                        )

                                                        removePicture(
                                                            artwork_id, 
                                                            e.target.id.split('/').pop()
                                                        )
                                                        
                                                        formik.setFieldValue(
                                                            "other_pictures", 
                                                            newArray
                                                        )
                                                        
                                                    }
                                                }
                                            />
                                        </Col>
                                        )
                                    })
                                }</Row> 
                            }

                            {formik.errors.other_pictures}
                        </Form.Group>

                        <ChangeArtworkDataInputComponent 
                            label="Description"
                            name="descript"
                            type="textarea"
                            placeholder="Enter description"
                            icon={faQuestion}
                            formik={formik}
                            artwork_id={artwork_id}
                        />
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

export default EditArtworkData

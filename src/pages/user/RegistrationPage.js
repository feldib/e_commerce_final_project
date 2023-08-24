import React from 'react'
import server_url from '../../server'
import axios from "axios"


import { Container, Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKey, faQuestion, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons'

function RegistrationPage(props) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [phone, setPhone] = React.useState("")

    const [firstEmail, setFirstEmail] = React.useState()
    const [firstPassword, setFirstPassword] = React.useState()

    async function handleSubmit(e){
        e.preventDefault()
        if(email && password && firstName && lastName && address){
            await axios.post(`${server_url}/users/new_user`, {
                last_name: lastName,
                first_name: firstName, 
                email, 
                password, 
                address, 
                phone_number: phone
            })
            .then(async function (response) {
                if(response.data.Status === "Success"){
                    await axios.post(`${server_url}/login`, {email, password})
                    .then(function (response) {
                        if(response.data){
                            console.log(response.data)
                            const userData = response.data
                            props.settleSuccessfulRegistration(userData)
                        }else{
                            throw Error("Wrong email or password")
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                }else{
                    throw Error("Wrong email or password")
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    }

    return (
        <Container>
        <Row>
            <Col className='mx-5 pt-5 pb-5'>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="Enter email" 
                                onBlur={(e)=>{
                                    setFirstEmail(e.target.value)
                                }}
                            />

                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address again</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faUser} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="email" placeholder="Enter email again" 
                                onBlur={(e)=>{
                                    if(e.target.value === firstEmail){
                                        setEmail(e.target.value)
                                    }
                                }}
                            />

                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faKey} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Enter password"
                                onBlur={(e)=>{
                                    setFirstPassword(e.target.value)
                                }}
                            />

                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password again</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faKey} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="password" placeholder="Enter password again" 
                                onBlur={(e)=>{
                                    if(e.target.value === firstPassword){
                                        setPassword(e.target.value)
                                    }
                                }}
                            />

                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter First Name" 
                                onBlur={(e)=>{
                                    setFirstName(e.target.value)
                                }}
                            />

                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faQuestion} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter Last Name" 
                                onBlur={(e)=>{
                                    setLastName(e.target.value)
                                }}
                            />

                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faHouse} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter Address" 
                                onBlur={(e)=>{
                                    setAddress(e.target.value)
                                }}
                            />

                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Phone Number</Form.Label>

                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faPhone} className='mx-3'/>
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter Phone Number" 
                                onBlur={(e)=>{
                                    setPhone(e.target.value)
                                }}
                            />

                        </InputGroup>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Col>
        </Row>
        </Container>
    )
}

export default RegistrationPage
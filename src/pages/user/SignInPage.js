import React from 'react'
import server_url from '../../server'
import axios from "axios"
import { Link } from 'react-router-dom'

import { Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKey } from '@fortawesome/free-solid-svg-icons'

function SignInPage(props) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    async function handleSubmit(e){
        e.preventDefault()
        await axios.post(`${server_url}/login`, {email, password})
            .then(function (response) {
                if(response.data !== false){
                    const userData = response.data
                    props.settleSuccessfulLogIn(userData)
                }else{
                    throw Error("Wrong email or password")
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <Row>
            <Row>
                <Col className='mx-5'>
                    <Form
                        onSubmit={handleSubmit}
                    >

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} className='mx-3'/>
                                </InputGroup.Text>
                                <Form.Control name="email" type="email" placeholder="Enter email" 
                                    onBlur={(e)=>{
                                        setEmail(e.target.value)
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
                                <Form.Control name="password" type="password" placeholder="Enter password" 
                                    onBlur={(e)=>{
                                        setPassword(e.target.value)
                                    }}
                                />

                            </InputGroup>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Row className='mx-5 mt-3'>
                <Col>
                    <Link
                        to="/forgot_password"
                    >
                    Forgot password
                    </Link>
                </Col>
            </Row>
        </Row>
    )
}

export default SignInPage
import React from 'react'
import server_url from '../../server'

import { Col, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser, faKey } from '@fortawesome/free-solid-svg-icons'

function SignInPage(props) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    
    async function handleSubmit(e){
        
        e.preventDefault()
        
        await fetch(
            `${server_url}/login`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email, password
                })
            }
        ).then((response)=>response.json())
        .then((userData)=>{
            props.settleSuccessfulLogIn(userData)
        })
        .catch((err)=>{console.log(err)})
    }

    return (
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
    )
}

export default SignInPage
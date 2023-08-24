import React from 'react'
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import server_url from '../../server'

function ForgotPasword() {
    const [email, setEmail] = React.useState("")
    const [messageHidden, setMessageHidden] = React.useState(true)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(email){
            await axios.post(`${server_url}/forgot_password`, {email})
                .catch(function (error) {
                    console.log(error)
                })
            setMessageHidden(false)
        }else{
            setMessageHidden(true)
        }
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

                    {!messageHidden && 
                        <Form.Group className='mt-2 mb-4'>
                            <Form.Text className="text-muted">
                                If a user is registered with this email, a password recovery link was sent to them
                            </Form.Text>
                        </Form.Group>
                    }

                    <Button variant="primary" type="submit">
                        Send link
                    </Button>

                </Form>
            </Col>
        </Row>
        )
}

export default ForgotPasword
import React from 'react'
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faKey } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import server_url from '../../server'

function ResetPassword() {
    const [firstNewPassword, setFirstNewPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")

    const search = useLocation().search

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(newPassword !== ""){
            const token = new URLSearchParams(search).get('token')
            const email = new URLSearchParams(search).get('email')
            await axios.post(`${server_url}/reset_password`, {
                token,
                email,
                new_password: newPassword
            })
        }
    }

    return (
        <Row>
            <Col className='mx-5'>
                <Form 
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <FontAwesomeIcon icon={faAsterisk} style={{color: "red"}} className='mx-3'/>

                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faKey} className='mx-3'/>
                            </InputGroup.Text>

                            <Form.Control type="password" placeholder="Enter password" 
                                onBlur={(e)=>{
                                    setFirstNewPassword(e.target.value)
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
                                    if(firstNewPassword && firstNewPassword === e.target.value){
                                        setNewPassword(e.target.value)
                                    }
                                }}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Change password
                    </Button>

                </Form>
            </Col>
        </Row>
        )
}

export default ResetPassword
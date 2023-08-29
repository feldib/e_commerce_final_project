import React from 'react'
import { changePassword } from '../../fetching'
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import InputComponent from '../../components/InputComponent'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'

function ResetPassword() {
    const [firstNewPassword, setFirstNewPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    const search = useLocation().search
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(newPassword !== ""){
            const token = new URLSearchParams(search).get('token')
            const email = new URLSearchParams(search).get('email')
            await changePassword(token, email, newPassword)
        }
    }

    return (
        <Container className='pb-5'>
            <Row>
                <Col className='mx-5 pt-5 pb-5'>
                    <Form 
                        onSubmit={handleSubmit}
                    >
                        <InputComponent 
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            icon={faKey}
                            changeValue={(value)=>{setFirstNewPassword(value)}}
                        />

                        <InputComponent 
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            icon={faKey}
                            extraCondition={newPassword !== firstNewPassword}
                            changeValue={(value)=>{
                                if(firstNewPassword && firstNewPassword === value){
                                    setNewPassword(value)
                                }   
                            }}
                        />

                        <Button variant="primary" type="submit">
                            Change password
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
        )
}

export default ResetPassword
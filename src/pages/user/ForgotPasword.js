import React from 'react'
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import InputComponent from '../../components/InputComponent'
import { sendForgotPasswordEmail } from '../../fetching'

function ForgotPasword() {
    const [email, setEmail] = React.useState("")
    const [messageHidden, setMessageHidden] = React.useState(true)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(email){
            await sendForgotPasswordEmail(email)
            setMessageHidden(false)
        }else{
            setMessageHidden(true)
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
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                icon={faUser}
                                changeValue={(value)=>{setEmail(value)}}
                            />

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
        </Container>
        )
}

export default ForgotPasword
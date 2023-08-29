import React from 'react'
import { Link } from 'react-router-dom'
import { logIn } from '../../fetching'
import InputComponent from '../../components/InputComponent'
import { Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'

function SignInPage(props) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    async function handleSubmit(e){
        e.preventDefault()
        await logIn(email, password, props.settleSuccessfulLogIn)
    }

    const emailWarningAsterisk = React.useRef()
    const passwordWarningAsterisk = React.useRef()

    return (
        <Container className='pb-5'>
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Log In</h1>
            </Row>
            <Row>
                <Col className='mx-3 pb-5'>
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

                        <InputComponent 
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            icon={faKey}
                            changeValue={(value)=>{setPassword(value)}}
                        />

                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Row className='mx-5 pt-3'>
                <Col>
                    <Link
                        to="/forgot_password"
                    >
                    Forgot password
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default SignInPage
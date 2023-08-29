import React from 'react'
import { registerNewUser } from '../../fetching'
import { logIn } from '../../fetching'
import InputComponent from '../../components/InputComponent'
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
            await registerNewUser(email, password, firstName, lastName, address, phone)
            .then(function (response) {
                console.log("reponse: ", JSON.stringify(response))
                if(response.data === true){
                    logIn(email, password, props.settleSuccessfulRegistration)
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
            <Row className='mb-2 mt-5 mb-3'>
                <h1 className='text-center'>Register</h1>
            </Row>
            <Row className='pb-5'> 
                <Col className='mx-5 pb-5'>
                    <Form onSubmit={handleSubmit}>
                        
                        <InputComponent 
                            label="Email address"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            icon={faUser}
                            changeValue={(value)=>{setFirstEmail(value)}}
                        />

                        <InputComponent 
                            label="Email address again"
                            name="email"
                            type="email"
                            placeholder="Enter email again"
                            icon={faUser}
                            extraCondition={firstEmail !== email}
                            changeValue={(value)=>{
                                if(value === firstEmail){
                                    setEmail(value)
                                }
                            }}
                        />

                        <InputComponent 
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            icon={faKey}
                            changeValue={(value)=>{setFirstPassword(value)}}
                        />

                        <InputComponent 
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            icon={faKey}
                            extraCondition={firstPassword !== password}
                            changeValue={(value)=>{
                                if(value === firstPassword){
                                    setPassword(value)
                                }
                            }}
                        />

                        <InputComponent 
                            label="First Name"
                            name="firstName"
                            type="text"
                            placeholder="Enter First Name"
                            icon={faQuestion}
                            changeValue={(value)=>{setFirstName(value)}}
                        />

                        <InputComponent 
                            label="First Name"
                            name="lastName"
                            type="text"
                            placeholder="Enter Last Name"
                            icon={faQuestion}
                            changeValue={(value)=>{setLastName(value)}}
                        />

                        <InputComponent 
                            label="Address"
                            name="address"
                            type="text"
                            placeholder="Enter Address"
                            icon={faHouse}
                            changeValue={(value)=>{setAddress(value)}}
                        />

                        <InputComponent 
                            label="Phone Number"
                            name="phone"
                            type="text"
                            placeholder="Enter Phone Number"
                            icon={faPhone}
                            changeValue={(value)=>{setPhone(value)}}
                        />

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
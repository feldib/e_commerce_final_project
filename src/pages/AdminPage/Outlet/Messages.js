import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SubPageTitle from '../../../components/SubPageTitle'
import useAxios from '../../../hooks/useAxios'
import useLoading from '../../../hooks/useLoading'
import { admin_url } from '../../../utils/api_constants'
import UnansweredMessage from '../../../components/UnansweredMessage'


function Messages(props) {
    
    const messages = useAxios(`/${admin_url}/unanswered_messages`)
    const messagesRepresented = useLoading(messages, ((messages)=>{
        return messages.map((message)=>{
            return <UnansweredMessage message={message} />
        })
    }))
    return (
        <Col>
            <SubPageTitle title="Unanswered messages" />

            <Row>
                {messagesRepresented}
            </Row>
        </Col>
    )
}

export default Messages
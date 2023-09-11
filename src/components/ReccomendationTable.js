import React from 'react'
import useAxios from '../hooks/useAxios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Container } from 'react-bootstrap'
import BuyTable from './BuyTable'
import { users_url } from '../utils/api_constants'

function ReccomendationTable(props) {
    const [tableHidden, setTableHidden] = React.useState(false)
    const data = useAxios(props.path)
    return (
        <Col sm={12} md={5} className="mb-2 mx-3">

            <Row>
                <Col>
                    <h4 className='text-center'>{props.title}</h4>
                </Col>
                <Col>
                    <FontAwesomeIcon 
                        icon={
                            !tableHidden ?
                                faCaretDown :
                                faCaretUp
                        } 
                        onClick={(e)=>{
                            setTableHidden(!tableHidden)
                        }}
                    />
                </Col>                                
            </Row>

            {!tableHidden &&
                <BuyTable 
                    reccomendation = {true}
                    theadNeeded = {false}
                    dataLines = {data}
                    loggedIn={props.loggedIn} 
                />
            }
        </Col>
                
    )
}

export default ReccomendationTable
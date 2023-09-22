import React from 'react'
import useAxios from '../../hooks/useAxios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
import BuyTable from './BuyTable'


function ReccomendationTable(props) {


    const [tableHidden, setTableHidden] = React.useState(false)
    const data = useAxios(props.path)
    return (
        <Col sm={12} md={5} className="mb-3 mx-auto floating-element">
            <Row>
                <Col>
                    <h4 className='text-center'>{`${props.title}`}
                    <FontAwesomeIcon 
                        className='toggle-reccommendation mx-2'
                        icon={
                            !tableHidden ?
                                faCaretDown :
                                faCaretUp
                        } 
                        onClick={(e)=>{
                            setTableHidden(!tableHidden)
                        }}
                    />
                    </h4>
                </Col>                                
            </Row>

            {!tableHidden &&
                <BuyTable 
                    reccomendation = {true}
                    theadNeeded = {false}
                    dataLines = {data}
                />
            }
        </Col>
                
    )
}

export default ReccomendationTable
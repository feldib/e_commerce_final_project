import React from 'react'
import useAxios from '../hooks/useAxios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Carousel } from 'react-bootstrap'
import { UserDataContext } from '../App'
import { useMediaQuery } from 'react-responsive'
import ReccomendationCard from './ReccomendationCard'

function Reccomendations(props) {
    const {loggedIn} = React.useContext(UserDataContext)

    const [tableHidden, setTableHidden] = React.useState(false)
    const data = useAxios(`${props.path}?n=10`)

    const isMd = useMediaQuery({ minWidth: '768px' })

    return (
        <>{data && data.length > 0 &&
        
        <Col xs={12} lg={5} className="mb-3 mx-auto">
            <Row>
                <Col xs={7} md={5} lg={7} className='mx-auto'>
                    <h4 className='text-center reccomendation-title'>{`${props.title}`}
                    <FontAwesomeIcon 
                        className='toggle-reccommendation mx-2 d-md-none'
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

            {(!tableHidden || isMd) && data &&
                <Carousel >{data.map((artwork, index)=>{
                    return(
                        <Carousel.Item interval={3000} className='mb-5 px-none'>
                            <ReccomendationCard
                                key={index}
                                artwork={artwork}
                            />
                        </Carousel.Item>
                    )

                })}</Carousel>
            }
        </Col>
        
        }</>
                
    )
}

export default Reccomendations
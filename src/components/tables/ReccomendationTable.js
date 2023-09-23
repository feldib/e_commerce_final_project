import React from 'react'
import useAxios from '../../hooks/useAxios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Card } from 'react-bootstrap'
import BuyTable from './BuyTable'
import FavouriteButton from '../buttons/FavouriteButton'
import ShoppingCartButton from '../buttons/ShoppingCartButton'
import { UserDataContext } from '../../App'
import { Link } from 'react-router-dom'

function ReccomendationTable(props) {
    const {user, loggedIn} = React.useContext(UserDataContext)

    const [tableHidden, setTableHidden] = React.useState(false)
    const data = useAxios(props.path)
    return (
        <Col xs={12} lg={5} className="mb-3 mx-auto">
            <Row>
                <Col>
                    <h4 className='text-center subpage-title'>{`${props.title}`}
                    <FontAwesomeIcon 
                        className='toggle-reccommendation mx-2 d-lg-none'
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

            {!tableHidden && data &&
                <>{data.map((artwork)=>{
                    return(
                        <Col className='mb-3'>
                        <Card className='mx-auto' border='secondary'>
                            <Card.Body className='p-3'>
                                <Row>
                                    <Col>
                                        <Card.Title>
                                            <Link to={`/artwork_page/${artwork.id}`}>
                                                <h3>
                                                    {artwork.title}
                                                </h3>
                                            </Link>
                                        </Card.Title>

                                        <Card.Subtitle>
                                            <h6>
                                                {`by ${artwork.artist_name}`}
                                            </h6>
                                        </Card.Subtitle>
                                    </Col>

                                    <Col xs={1} className='text-center px-3'>
                                        <span onClick={
                                            ()=>{
                                                if(loggedIn && artwork.quantity>0){
                                                    // props.decreaseQuantity()

                                                }
                                            }
                                        }>
                                            <ShoppingCartButton
                                                artwork_id={artwork.id}
                                                quantity={artwork.quantity}
                                            />
                                        </span>
                                        
                                        <FavouriteButton
                                            artwork_id={artwork.id}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                            

                            <Card.Img 
                                src={artwork.thumbnail}
                                width="500"
                                height="300"
                                style={{objectFit: "cover"}}
                                alt="place of thumbnail"
                                variant='bottom'
                            />
                        </Card>                    
                    </Col>)

                })}</>
            }
        </Col>
                
    )
}

export default ReccomendationTable
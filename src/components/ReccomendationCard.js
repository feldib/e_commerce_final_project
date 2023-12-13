import React from 'react'
import { server_url } from '../utils/api_constants';
import { Col, Row, Card, Carousel } from 'react-bootstrap'
import FavouriteButton from './buttons/FavouriteButton'
import ShoppingCartButton from './buttons/ShoppingCartButton'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../App';

function ReccomendationCard(props) {

    const {user, loggedIn} = React.useContext(UserDataContext)
    const [quantity, setQuantity] = React.useState(props.artwork.quantity)
    React.useEffect(()=>{
        if(!loggedIn){
            const signedOutShoppingCart = JSON.parse(localStorage.getItem('shopping_cart')) || []
            if(signedOutShoppingCart.length){
                const index = signedOutShoppingCart.findIndex((item)=>{
                    return item.artwork_id === props.artwork.id
                })
                if(index !== -1){
                    setQuantity(
                        props.artwork.quantity - signedOutShoppingCart[index].quantity
                    ) 
                }
            }
        }
    }, [])

    return (
        <Card className='mx-auto' border='secondary'>
            <Card.Body className='p-3'>
                <Row>
                    <Col>
                        <Card.Title>
                            <Link to={`/artwork_page/${props.artwork.id}`}>
                                <h3>
                                    {props.artwork.title}
                                </h3>
                            </Link>
                        </Card.Title>

                        <Card.Subtitle>
                            <h6>
                                {`by ${props.artwork.artist_name}`}
                            </h6>
                        </Card.Subtitle>
                    </Col>

                    <Col xs={1} className='text-center px-3'>
                        <span 
                            className='reccommendation-button'
                            onClick={()=>{
                                if(quantity>0){
                                    setQuantity(quantity-1)
                                }
                            }}
                        >
                            <ShoppingCartButton
                                artwork_id={props.artwork.id}
                                quantity={quantity}
                            />
                        </span>
                        
                        <span className='reccommendation-button'>
                            <FavouriteButton
                                artwork_id={props.artwork.id}
                            />
                        </span>
                    </Col>
                </Row>
            </Card.Body>
            

            <Card.Img 
                src={`${server_url}/${props.artwork.thumbnail}`}
                width="500"
                height="300"
                style={{objectFit: "cover"}}
                alt="place of thumbnail"
                variant='bottom'
            />
        </Card>                    
    )
}

export default ReccomendationCard;
import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { 
    EmailShareButton, EmailIcon,
    TelegramShareButton, TelegramIcon,
    RedditShareButton, RedditIcon
} from 'react-share'

function Footer() {
    return (
            <Navbar id='footer' fixed="bottom">
                <Container>
                    <Nav className='mx-auto' col="12">
                        <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/about">
                            About
                        </Link>
                        
                        <Link className='nav-link' style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contact">
                            Contact
                        </Link>

                        <Nav.Link>
                            <TelegramShareButton 
                                url={window.location.hostname}
                                quote={"Buy the best, from the best - Artwork Market"}
                                hashtag="#Artwork Market"
                            >
                                <TelegramIcon size={25} round />
                            </TelegramShareButton>
                        </Nav.Link>

                        <Nav.Link>
                            <EmailShareButton 
                                url={window.location.hostname}
                                quote={"Buy the best, from the best - Artwork Market"}
                                hashtag="#Artwork Market"
                            >
                                <EmailIcon size={25} round />
                            </EmailShareButton>
                        </Nav.Link>

                        <Nav.Link>
                            <RedditShareButton 
                                url={window.location.hostname}
                                quote={"Buy the best, from the best - Artwork Market"}
                                hashtag="#Artwork Market"
                            >
                                <RedditIcon size={25} round />
                            </RedditShareButton>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
}

export default Footer
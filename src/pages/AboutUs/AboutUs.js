import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import PageTitle from '../../components/PageTitle'

function AboutUsPage() {
    return (
        <Container className='px-3 pb-5'>
            <PageTitle title="About us" />
            <Row className='mx-auto mb-5'>
                <Col className='pb-5 floating-element'>
                    <Row className='text-center'>
                        <h2>Our story</h2>
                    </Row>

                    <Row>
                        <p>Welcome to our world of art! Our story began with a simple yet profound passion: the love for creativity in all its forms. We envisioned a platform that celebrates not just the beauty of art but also the stories behind each masterpiece. Driven by our admiration for diverse artistic expressions, we embarked on a journey to create a space where artists and art enthusiasts converge.</p>
                        <p>Our goal is to bridge the gap between creators and appreciators, fostering a community that thrives on inspiration and imagination. Art has the incredible power to evoke emotions, provoke thoughts, and ignite conversations. Through our platform, we aim to showcase the vibrant tapestry of artistic endeavors while honoring the unique narratives woven into every brushstroke, sculpture, and creation.</p>
                        <p>Join us on this enchanting voyage as we curate a collection of exceptional artworks, each with its own tale to tell. Together, let's celebrate the essence of creativity and the boundless stories that reside within each artistic marvel.</p>
                    </Row>
                </Col>

            </Row>
        </Container>
    )
}

export default AboutUsPage;
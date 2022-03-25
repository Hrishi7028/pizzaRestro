import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import '../Styles/Slider.css'
const Slider = () => {
    return (
        <>
            <Carousel prevLabel="" nextLabel="" fade="true">
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100"
                        src='/images/Carosel/c2.jpg'
                        height="500px"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 className='slider_header_tag' >All Types of Pizzas @ ONE Place...</h3>
                        <h4 className='slider_para_tag'>Eat ...sleep...code...repeat.</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100"
                        src='/images/Carosel/c3.jpg'
                        height="500px"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3 className='slider_header_tag' >All Types of Pizzas are @ One Place...</h3>
                        <h4 className='slider_para_tag'>Eat ...sleep...code...repeat.</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100"
                        src='/images/Carosel/c2.jpg'
                        height="500px"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3 className='slider_header_tag' >All Types of Pizzas are @ One Place...</h3>
                        <h4 className='slider_para_tag'>Eat ...sleep...code...repeat.</h4>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Slider

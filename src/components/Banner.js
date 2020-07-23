import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Banner.css";

function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      interval="2000"
      onSelect={handleSelect}
      className="banner"
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="540px"
          src="https://images5.alphacoders.com/390/thumb-1920-390370.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Celebrate your special day with us</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="540px"
          src="https://images3.alphacoders.com/210/thumb-1920-210989.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Your celebration our celebration</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="540px"
          src=" https://images4.alphacoders.com/903/thumb-1920-903764.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Your celebration our celebration </h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;

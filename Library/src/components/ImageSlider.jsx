/* eslint-disable react/prop-types */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Box, IconButton, Flex } from "@chakra-ui/react"; // Import Box from Chakra UI
import { useRef } from "react";

const ImageSlider = ({ images }) => {
  const sliderRef = useRef();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <Box width="500px" position="relative">
      {" "}
      {/* Add position:relative to parent Box */}
      <Slider {...settings} ref={sliderRef}>
        {images.map((item, index) => (
          <div key={index}>
            {/* Use Box instead of div */}
            <Box backgroundColor={item.color} width="500px" height="500px" />
          </div>
        ))}
      </Slider>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        top="45%"
        left="0"
        right="0"
        zIndex="1"
      >
        {" "}
        {/* Centered container */}
        <IconButton
          background={"transparent"}
          aria-label="Previous Slide"
          icon={<ChevronLeftIcon className="h-5 w-5" />}
          onClick={prevSlide}
        />
        <IconButton
          background={"transparent"}
          aria-label="Next Slide"
          icon={<ChevronRightIcon className="h-5 w-5" />}
          onClick={nextSlide}
        />
      </Flex>
    </Box>
  );
};

export default ImageSlider;

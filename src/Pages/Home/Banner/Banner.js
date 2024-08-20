import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import slidesData from "../../../assets/slides.json"; // Path to your JSON file
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import "./Banner.css";

const Banner = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        setSlides(slidesData);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        appendDots: dots => (
            <div>
                <ul className="custom-dots">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div className="h-1 w-8 bg-gray-400 rounded-full mx-1"></div>
        ),
    };

    return (
        <div className="py-7 bg-gradient-to-r from-[#191654] to-[#43C6AC]">
          <div className="w-full max-w-6xl mx-auto relative">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative">
                      <div className="h-72 lg:h-[40rem] overflow-hidden">
                        <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                      </div>
                        <div className="absolute bottom-2 lg:bottom-10 left-0 right-0 bg-black bg-opacity-80 text-white p-1 lg:p-5 text-center">
                            <p className="m-0 text-xs lg:text-lg font-semibold lg:font-bold text-yellow-300">{slide.content}</p>
                        </div>
                    </div>
                ))}
            </Slider>
          </div>
        </div>
    );
};

export default Banner;

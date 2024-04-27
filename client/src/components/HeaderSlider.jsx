import React, { useContext, useState } from "react";
import { Parallax, Navigation, Pagination, Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow'
import './HeaderSlider.css'

const HeaderSlider = () => {

  const images = [
    'https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/aa1b2bdcf519b468.jpg?q=20',
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/a86d6e688296f007.png?q=20',
    'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/119ccdb4164bda39.jpg?q=20'
  ];

  return (
    <div className="slider-main-div">
      <div className="slider-title">
        <h1>Explore Our <span className="gold">Wedding Gallery Virtually</span></h1>
      </div>
    <div className="slider-div">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        speed={1500}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax, Keyboard]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              loading='lazy'
              onClick={() => handleImageClick(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  )
}

export default HeaderSlider
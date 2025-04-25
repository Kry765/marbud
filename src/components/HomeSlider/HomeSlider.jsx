import React from "react";
import Slider from "react-slick";
import { carouselData } from "../../data/carouselData.json";
import Logo from "../../ui/Logo/Logo";
import ButtonAction from "../../ui/Button/ButtonAction";
import HomeSliderDescription from "./HomeSliderDescription";
import homeslider from "./homeslider.module.scss";

export default function HomeSlider() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots slick-thumb",
    customPaging: () => (
      <div
        style={{
          position: "absolute",
          bottom: "150%",
          width: "12px",
          height: "12px",
          backgroundColor: "#fff",
          borderRadius: "50%",
        }}
      ></div>
    ),
  };

  return (
    <Slider {...settings}>
      {carouselData.map((data, index) => (
        <div key={index}>
          <div className={homeslider.slider}>
            <img
              src={data.image}
              alt="homepage_slider"
              className={homeslider.image}
            />
            <div className={homeslider.opacity}></div>
            <div className={homeslider.description}>
              <Logo className={homeslider.homeSliderTitle} />
              <HomeSliderDescription>{data.description}</HomeSliderDescription>
              <ButtonAction to={data.path}>{data.button}</ButtonAction>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

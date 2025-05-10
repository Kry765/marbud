import React, { useEffect, useState, useRef } from "react";
import Logo from "../../ui/Logo/Logo";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import homeslider from "./homeslider.module.scss";

export default function HomeSlider() {
  const sliderImage = [
    {
      src: "/image/domek_1.webp",
      altText: "domek marbud",
      title: "Nowoczesny Domek Marbud",
      buttonText: "Zobacz więcej",
      buttonLink: "/oferta/domek-marbud",
    },
    {
      src: "/image/domek_2.webp",
      altText: "domek całoroczny",
      title: "Domek Całoroczny Premium",
      buttonText: "Sprawdź ofertę",
      buttonLink: "/oferta/domek-caloroczny",
    },
    {
      src: "/image/domek_3.webp",
      altText: "domek całoroczny",
      title: "Nowa Kolekcja Domków",
      buttonText: "Poznaj więcej",
      buttonLink: "/kolekcja",
    },
    {
      src: "/image/domek_4.webp",
      altText: "domek całoroczny",
      title: "Idealny na każdą porę roku",
      buttonText: "Kontakt",
      buttonLink: "/kontakt",
    },
  ];

  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 4000;

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === sliderImage.length - 1 ? 0 : prev + 1));
    }, delay);

    return () => resetTimeout();
  }, [current]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div className={homeslider.wrapper}>
      {sliderImage.map((data, index) => (
        <div
          key={index}
          className={`${homeslider.slideWrapper} ${
            index === current ? homeslider.active : homeslider.inactive
          }`}
        >
          <img
            src={data.src}
            alt={data.altText}
            className={homeslider.slide}
            width="1920"
            height="1080"
            fetchpriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            srcSet={`
              ${data.src}?w=480 480w,
              ${data.src}?w=768 768w,
              ${data.src}?w=1024 1024w,
              ${data.src} 1920w
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className={homeslider.overlay}>
            <Logo />
            <h2>{data.title}</h2>
            <ButtonAction to={data.buttonLink}>{data.buttonText}</ButtonAction>
          </div>
        </div>
      ))}
    </div>
  );
}

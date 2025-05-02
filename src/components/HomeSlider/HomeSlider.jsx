import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Logo from "../../ui/Logo/Logo";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import homeslider from "./homeslider.module.scss";

export default function HomeSlider() {
  const [descriptionSlider, setDescriptionSlider] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:1337/api/silders?populate=*`);
        const data = await res.json();
        const formattedData = data.data.map((item) => ({
          id: item.id,
          description: item.description,
          imageUrl: `http://localhost:1337${item.image?.url}`,
          button: item.button,
          path: item.path,
        }));
        setDescriptionSlider(formattedData);
      } catch (err) {
        console.error(`Błąd pobierania danych z ${endpoint}:`, err);
      }
    };

    loadData();
  }, []);

  const settings = {
    lazyLoad: true,
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

  if (!descriptionSlider.length) {
    return <div style={{ height: "80vh" }}></div>;
  }

  return (
    <Slider {...settings} role="region" aria-label="Slider główny">
      {descriptionSlider.map((data, index) => (
        <div key={data.id}>
          <div className={homeslider.slider}>
            {index === 0 && (
              <link
                rel="preload"
                href={data.imageUrl}
                as="image"
                type="image/webp"
                media="(min-width: 768px)"
              />
            )}
            <img
              src={data.imageUrlSmall}
              srcSet={`${data.imageUrlSmall} 480w, ${data.imageUrl} 1920w`}
              sizes="(max-width: 480px) 480px, 1920px"
              alt="homepage_slider"
              className={homeslider.image}
              width="1920"
              height="1080"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority="high"
            />
            <div className={homeslider.opacity}></div>
            <div className={homeslider.description}>
              <Logo className={homeslider.homeSliderTitle} />
              <h2>{data.description}</h2>
              <ButtonAction
                to={data.path}
                aria-label={`Przejdź do ${data.button}`}
                tabIndex="-1"
                aria-hidden="true"
              >
                {data.button}
              </ButtonAction>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

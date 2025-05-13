import { useEffect, useState, useRef } from "react";
import Logo from "../../ui/Logo/Logo";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import homeslider from "./homeslider.module.scss";

export default function HomeSlider() {
  const sliderImage = [
    {
      src: "/image/domek_1.webp",
      altText: "Dom drewniany MARBUD – projekt gotowy do realizacji",
      title:
        "Producent domów drewnianych, całorocznych i letniskowowy - gotowe projekty do natychmiastowej realizacji",
      buttonText: "Zobacz projekty domów",
      buttonLink: "/galeria",
    },
    {
      src: "/image/domek_2.webp",
      title:
        "Domy całoroczne i letniskowe z drewna - najwyższa jakość wykonania i materiałów",
      altText: "Dom drewniany – całoroczny lub letniskowy",
      buttonText: "Poznaj szczegóły oferty",
      buttonLink: "/oferta",
    },
    {
      src: "/image/domek_3.webp",
      title: "Zobacz, jak wygląda proces zamówienia domu krok po kroku",
      buttonText: "Dowiedz się więcej",
      altText: "Dom drewniany MARBUD",
      buttonLink: "/jak-dzialamy",
    },
    {
      src: "/image/domek_4.webp",
      altText: "Dom drewniany MARBUD",
      title: "Masz pytania? Skontaktuj się z nami – chętnie doradzimy",
      buttonText: "Skontatuk się",
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
            fetchPriority={index === 0 ? "high" : "auto"}
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
            <h1 className={homeslider.title}>{data.title}</h1>
            <ButtonAction to={data.buttonLink}>{data.buttonText}</ButtonAction>
            <div className={homeslider.dotsWrapper}>
              {sliderImage.map((_, index) => (
                <button
                  key={index}
                  className={`${homeslider.dot} ${
                    index === current ? homeslider.activeDot : ""
                  }`}
                  onClick={() => setCurrent(index)}
                  aria-label={`Przejdź do slajdu ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

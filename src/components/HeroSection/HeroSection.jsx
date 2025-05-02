import hero from "./hero.module.scss";
import Subtitle from "../../ui/Subtitle/Subtitile";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import React, { useEffect } from "react";

export default function HeroSecion({ data, isReverse, showButton = true }) {
  return (
    <div
      data-aos="fade-right"
      data-aos-easing="ease-in-sine"
      className={`${hero.findStyleBox} ${isReverse ? hero.reverse : ""}`}
    >
      <div className={hero.findStyleWrapper}>
        <Subtitle>{data.title}</Subtitle>
        <div
          className={hero.findStyleDescription}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <div className={hero.findStyleBtn}>
          {showButton && data.button && (
            <ButtonAction to={data.path}>{data.button}</ButtonAction>
          )}
        </div>
      </div>
      <div className={hero.findStyleImage}>
        <img
          src={data.imageUrl}
          alt="house_image"
          loading="lazy"
          width="600"
          height="400"
          style={{
            aspectRatio: "3/2",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}

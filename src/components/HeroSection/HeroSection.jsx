import hero from "./hero.module.scss";
import Subtitle from "../../ui/Subtitle/Subtitile";
import ButtonAction from "../../ui/Button/ButtonAction";
import ReactMarkdown from "react-markdown";

export default function HeroSecion({ data, isReverse, showButton = true }) {
  return (
    <div className={`${hero.findStyleBox} ${isReverse ? hero.reverse : ""}`}>
      <div className={hero.findStyleWrapper}>
        <Subtitle className={hero.findStyleTitle}>{data.title}</Subtitle>
        <div className={hero.findStyleDescription}>
          <ReactMarkdown>{data.description}</ReactMarkdown>
        </div>
        <div className={hero.findStyleBtn}>
          {showButton && data.button && (
            <ButtonAction to={data.path}>{data.button}</ButtonAction>
          )}
        </div>
      </div>
      <div className={hero.findStyleImage}>
        <img src={data.imageUrl} alt="house_image" />
      </div>
    </div>
  );
}

import hero from "./hero.module.scss";
import Subtitle from "../../ui/Subtitle/Subtitile";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import ReactMarkdown from "react-markdown";

export default function HeroSection({ data, isReverse, showButton = true }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className={`${hero.findStyleBox} ${isReverse ? hero.reverse : ""}`}
      data-aos="fade-right"
      data-aos-easing="ease-in-sine"
    >
      <div className={hero.findStyleWrapper}>
        <Subtitle id="hero-heading">{data.title}</Subtitle>
        <article className={hero.findStyleDescription}>
          <ReactMarkdown>{data.description}</ReactMarkdown>
        </article>
        {showButton && data.button && (
          <div className={hero.findStyleBtn}>
            <ButtonAction
              to={data.path}
              aria-label={`Przejdź do ${data.button}`}
            >
              {data.button}
            </ButtonAction>
          </div>
        )}
      </div>
      <figure className={hero.findStyleImage}>
        <img
          src={data.imageUrl}
          alt={data.altText || "Nowoczesny dom drewniany MARBUD"}
          loading="lazy"
          width="600"
          height="400"
          style={{
            aspectRatio: "3/2",
            maxWidth: "100%",
            height: "auto",
          }}
        />
        {data.imageCaption && <figcaption>{data.imageCaption}</figcaption>}
      </figure>
    </section>
  );
}

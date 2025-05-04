import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import GalleryComponent from "../GalleryComponent/GalleryComponent";
import { useParams } from "react-router-dom";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import detailed from "./detailed.module.scss";
import Subtitle from "../../ui/Subtitle/Subtitile";

export default function DetailedOffertsComponent() {
  const { id, type } = useParams();
  const [domek, setDomek] = useState(null);

  useEffect(() => {
    fetch(`https://marbudapi.onrender.com/api/${type}?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const domekZnaleziony = data.data.find((el) => el.id === Number(id));
        setDomek(domekZnaleziony);
        console.log(
          "Dane domek.galleryOfferts: ",
          domekZnaleziony?.galleryOfferts
        );
      })
      .catch((err) =>
        console.error("Błąd podczas pobierania szczegółów:", err)
      );
  }, [id, type]);

  if (!domek) return <p>Ładowanie...</p>;

  const mainImageUrl =
    domek.image?.url ||
    (domek.image?.data?.attributes?.url
      ? `https://res.cloudinary.com/dthrbelf6/image/upload/${domek.image.data.attributes.url}`
      : null);

  const galleryImages =
    domek.galleryOfferts?.map((item) => ({
      imageUrl:
        item.formats?.medium?.url ||
        item.formats?.large?.url ||
        item.formats?.small?.url ||
        null,
      title: item.alternativeText || "Brak opisu",
    })) || [];

  return (
    <div className={detailed.main}>
      <div className={detailed.descriptionWrapper}>
        <div className={detailed.descriptionBox}>
          <Subtitle className={detailed.title}>{domek.title}</Subtitle>
          <ul className={detailed.specificationDescription}>
            <li>Ilość pomieszczeń: {domek.roomCount}</li>
            <li>Materiały: {domek.materials}</li>
            <li>Izolacja: {domek.isolation}</li>
            <li>Powierzchnia: {domek.area}</li>
            <li>Cena: {domek.price}</li>
          </ul>
          <ReactMarkdown>{domek.description}</ReactMarkdown>
        </div>

        <div className={detailed.mainImgBox}>
          {mainImageUrl ? (
            <img
              src={mainImageUrl}
              className={detailed.mainImg}
              alt={domek.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
            />
          ) : (
            <p>Brak obrazka</p>
          )}
        </div>
      </div>

      <div className={detailed.descriptionBox}>
        <h3 className={detailed.title}>Specyfikacja</h3>
        <ReactMarkdown>{domek.specificationDescription}</ReactMarkdown>

        {galleryImages.length > 0 ? (
          <GalleryComponent
            cols={5}
            photos={galleryImages.filter((img) => img.imageUrl)}
          />
        ) : (
          <p>Brak galerii</p>
        )}
      </div>

      <div className={detailed.buttonOfferts}>
        <ButtonAction to="../kontakt">Kontakt</ButtonAction>
      </div>
    </div>
  );
}

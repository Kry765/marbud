import { useEffect, useState } from "react";
import GalleryComponent from "../GalleryComponent/GalleryComponent";
import { useParams } from "react-router-dom";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import detailed from "./detailed.module.scss";

export default function DetailedOffertsComponent() {
  const { id, type } = useParams();
  const [domek, setDomek] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1337/api/${type}?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const domekZnaleziony = data.data.find((el) => el.id === Number(id));
        setDomek(domekZnaleziony);
      })
      .catch((err) =>
        console.error("Błąd podczas pobierania szczegółów:", err)
      );
  }, [id, type]);

  if (!domek) return <p>Ładowanie...</p>;

  const imageUrl = domek.mainImage?.url;

  return (
    <div className={detailed.main}>
      <div className={detailed.descriptionWrapper}>
        <div className={detailed.descriptionBox}>
          <h2 className={detailed.title}>{domek.title}</h2>
          <ul className={detailed.specificationDescription}>
            <li>Ilość pomieszczeń: {domek.roomCount}</li>
            <li>Materiały: {domek.materials}</li>
            <li>Izolacja: {domek.isolation}</li>
            <li>Powierzchnia: {domek.area}</li>
            <li>Cena: {domek.price}</li>
          </ul>
          <p className={detailed.specificationDescription}>
            {domek.description}
          </p>
        </div>

        <div className={detailed.mainImgBox}>
          {imageUrl ? (
            <img
              src={`http://localhost:1337${imageUrl}`}
              className={detailed.mainImg}
              alt={domek.title}
            />
          ) : (
            <p>Brak obrazka</p>
          )}
        </div>
      </div>
      <h3 className={detailed.title}>Specyfikacja</h3>
      <div
        dangerouslySetInnerHTML={{ __html: domek.specification }}
        className={detailed.specificationDescription}
      />
      {domek.image && domek.image.length > 0 && (
        <GalleryComponent
          cols={5}
          photos={domek.image.map((img) => ({
            imageUrl: `http://localhost:1337${img.url}`,
            title: img.alternativeText || "Brak opisu",
          }))}
        />
      )}
      <div className={detailed.buttonOfferts}>
        <ButtonAction to="../kontakt"> kontakt</ButtonAction>
      </div>
    </div>
  );
}

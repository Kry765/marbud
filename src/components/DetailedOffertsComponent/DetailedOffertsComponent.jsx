import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import GalleryComponent from "../GalleryComponent/GalleryComponent";
import { useParams } from "react-router-dom";
import ButtonAction from "../../ui/ButtonAction/ButtonAction";
import detailed from "./detailed.module.scss";
import Subtitle from "../../ui/Subtitle/Subtitile";
import LoadingComponent from "../../ui/LoadingComponent/LoadingComponent";

export default function DetailedOffertsComponent() {
  const { id, type } = useParams();
  const [domek, setDomek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://marbudapi.onrender.com/api/${type}?populate=*`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const domekZnaleziony = data.data.find((el) => el.id === Number(id));
        if (!domekZnaleziony) throw new Error("Offer not found");
        setDomek(domekZnaleziony);
      })
      .catch((err) => {
        console.error("Error fetching offer details:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id, type]);

  if (loading) return <LoadingComponent />;
  if (error) return <div className={detailed.error}>Error: {error}</div>;
  if (!domek) return <div className={detailed.notFound}>Offer not found</div>;

  const mainImageUrl =
    domek.image?.url ||
    (domek.image?.data?.attributes?.url
      ? `https://res.cloudinary.com/dthrbelf6/image/upload/${domek.image.data.attributes.url}`
      : null);

  const galleryImages =
    domek.galleryOfferts?.map((item) => ({
      title: item.title,
      imageUrl:
        item.formats?.medium?.url ||
        item.formats?.large?.url ||
        item.formats?.small?.url ||
        null,
      // title: item.alternativeText || "Brak opisu",
    })) || [];

  return (
    <div className={detailed.main}>
      <div className={detailed.descriptionWrapper}>
        <div className={detailed.mainImgBox}>
          {mainImageUrl ? (
            <img
              src={mainImageUrl}
              className={detailed.mainImg}
              alt={domek.title}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg";
              }}
            />
          ) : (
            <div className={detailed.imagePlaceholder}>
              <p>Brak obrazka</p>
            </div>
          )}
        </div>

        <div className={detailed.descriptionBox}>
          <Subtitle className={detailed.title}>{domek.title}</Subtitle>
          <ul className={detailed.specificationDescription}>
            <li>
              <span>Ilość pomieszczeń:</span> {domek.roomCount}
            </li>
            <li>
              <span>Materiały:</span> {domek.materials}
            </li>
            <li>
              <span>Izolacja:</span> {domek.isolation}
            </li>
            <li>
              <span>Powierzchnia:</span> {domek.area}
            </li>
            <li className={detailed.price}>
              <span>Cena:</span> {domek.price}
            </li>
          </ul>

          <div className={detailed.descriptionText}>
            <ReactMarkdown>{domek.description}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className={detailed.specificationSection}>
        <h3 className={detailed.sectionTitle}>Specyfikacja</h3>
        <div className={detailed.specificationText}>
          <ReactMarkdown>{domek.specificationDescription}</ReactMarkdown>
        </div>

        {galleryImages.length > 0 ? (
          <GalleryComponent
            cols={3}
            item={item}
            photos={galleryImages.filter((img) => img.imageUrl)}
          />
        ) : (
          <p className={detailed.noGallery}>Brak galerii</p>
        )}
      </div>

      <div className={detailed.buttonOfferts}>
        <ButtonAction to="../kontakt">Kontakt</ButtonAction>
      </div>
    </div>
  );
}

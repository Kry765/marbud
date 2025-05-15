import list from "./list.module.scss";
import "../../scss/main.scss";
import ButtonAction from "../../ui/ButtonAction/ButtonAction.jsx";

export default function OfffertsList({ domek, imageUrl, type }) {
  return (
    <div
      key={domek.id}
      className={list.offertsSummerWrapper}
      data-aos="fade-right"
      data-aos-easing="ease-in-sine"
    >
      <div className={list.offertsSummerImageBox}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={domek.title}
            className={list.offertsSummerImage}
            loading="lazy"
          />
        ) : (
          <div className={list.imagePlaceholder}>
            <p>Brak obrazka</p>
          </div>
        )}
      </div>

      <div className={list.offertsSummerDescription}>
        <h3 className={`text-uppercase ${list.title}`}>{domek?.title}</h3>
        <div className={list.details}>
          <p>Ilość pomieszczeń: {domek.roomCount}</p>
          <p>Materiały:{domek.materials}</p>
          <p>Izolacja: {domek.isolation}</p>
          <p>Powierzchnia: {domek.area}</p>
          <p className={list.price}>Cena: {domek.price}</p>
        </div>
        <div className={list.buttonOfferts}>
          <ButtonAction to={`/oferta/${type}/${domek.id}`}>
            Przejdź dalej
          </ButtonAction>
        </div>
      </div>
    </div>
  );
}
